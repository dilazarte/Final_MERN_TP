const express = require('express')
const handlebars = require('express-handlebars');
const path =  require('path');
const app = express()
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { infoSys } = require('./src/utils/dataInfo')
const passport = require('./src/utils/passportLogin')
require('dotenv').config()
const parseArgs = require('minimist')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length
const compression = require('compression');
const {loggerInfo, loggerDebug, loggerError} = require('./src/utils/loggers');
//const { graphqlRouter } = require('./src/routes/graphql');



//utilizando minimist para setear puerto por defecto o recibirlo por parametro.-
const defaultOp = {
    default: {port: 8080, modo: 'fork'},
    alias: {p:'port', m:'modo'}
};
const args = parseArgs(process.argv.slice(2), defaultOp);

const PORT = process.env.PORT || 8080;
const MODE = process.env.MODE_ENV || 'fork';



function startServer(){

    //rutas
    const adminRouter = require('./src/routes/admin');
    const chatsRouter = require('./src/routes/chatRoutes')
    const prodTest = require('./src/routes/productosRoutes')
    const loginRouter = require('./src/routes/login');
    const logoutRouter = require('./src/routes/logout');
    const inicioRouter =  require('./src/routes/inicio');
    const registerRouter = require('./src/routes/register');
    const loginError =  require('./src/routes/loginerror')
    const signUpError =  require('./src/routes/signuperror')
    const randomsNums = require('./src/routes/randoms')
    const notFound = require('./src/routes/404');
    const { routerProductos } = require('./src/routes/api.productos');
    const { routerCarrito } = require('./src/routes/api.carritos');
    const myCart = require('./src/routes/myCart');
    const {graphqlRouter} = require('./src/routes/graphql')
    const {routerOrders} = require('./src/routes/orders')
    const { schemaProds, rootValues } = require('./src/controllers/graphqlController');
    const {graphqlHTTP} = require('express-graphql')

    //para recibir info desde post
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, '/public')));
    app.use('/images/avatar', express.static(path.join(__dirname, '/public/uploads'))); //imagenes de usuarios - ruta virtual


    //template engine
    app.engine(
        'hbs',
        handlebars.engine({
            extname:'.hbs',
            defaultLayout: path.join(__dirname, './src/views/layaouts/index.hbs'),
            layoutsDir:path.join(__dirname, './src/views/layaouts'),
            partialsDir: path.join(__dirname,'./src/views/partials')
        })
    );
    app.set('view engine', '.hbs');
    app.set('views', path.join(__dirname, './src/views'));


    //configurando sesiones en mongo.-
    const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true}
    app.use(session({
        store: MongoStore.create({
            mongoUrl:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/sesiones?retryWrites=true&w=majority`,
            ongoOptions: mongoOptions
        }),
        cookie: {maxAge: 600000},
        secret:"sesionSecreta123",
        resave:true,
        saveUninitialized:true,
        rolling:true
    }))

    //iniciando passport.-
    app.use(passport.initialize());
    app.use(passport.session());


    //usando compression
    app.use(compression())

    app.use('/', inicioRouter)
    app.use('/api/productosTest', prodTest)
    app.use('/api/productos', routerProductos) //este es el principal, quitar el de productos randoms
    app.use('/api/carritos', routerCarrito)
    app.use('/api/chat', chatsRouter)
    app.use('/api/orders', routerOrders) //ordenes
    app.use('/login', loginRouter)
    app.use('/logout', logoutRouter)
    app.use('/admin', adminRouter)
    app.use('/register', registerRouter)
    app.use('/loginError', loginError)
    app.use('/signupError', signUpError)
    app.use('/admin/myCart/', myCart)
    app.use('/graphql', graphqlRouter)
    
    //ruta randoms
    app.use('/api/randoms', randomsNums)
    //ruta info!
    app.get('/info', (req, res) => {
        //loggerInfo.info(infoSys)
        res.send(infoSys)
    })
    app.get('/infobloq', (req, res) => {
        //loggerInfo.info(infoSys)
        res.json(infoSys)
    })
    app.get('/infonobloq', (req, res) => {
        //loggerInfo.info(infoSys)
        res.json(infoSys)
    })
    app.use('*', notFound)
    

    const { Server: HttpServer } = require('http');
    const { Server: IOServer } = require('socket.io');

    const httpServer = new HttpServer(app);
    const io = new IOServer(httpServer);

    io.on('connection', (socket) => {
        loggerInfo.info(`Usuario conectado ${socket.id} - ${socket.handshake.address}`);
        
        socket.emit('msg', '')
        socket.on('newMsg', ()=>{
            io.sockets.emit('msg', '')
        })
    });

    const serverON = httpServer.listen(PORT, ()=>{
        loggerInfo.info(`Server on port ${PORT} -  mode: ${MODE} - PID: ${process.pid}`)
    })
    serverON.on('error', error=> loggerError.error(`Error del servidor ${error}`))
}



if(MODE == 'cluster' && cluster.isMaster){
    loggerInfo.info(`PID ${process.pid}`);
    
    for (let index = 0; index < numCPUs; index++) {
        cluster.fork();
    }
    cluster.on('exit', worker => {
        loggerInfo.info(`Master PID: ${process.pid}`);
        loggerInfo.info(`Worker ${worker.process.pid} died`);
        cluster.fork(); //si muere uno se vuelve a iniciar con otro PID
    });
} else {
    startServer();
}