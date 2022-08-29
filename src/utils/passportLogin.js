const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usuarios = require('../models/mongoUsuariosModel');
const { encryptPass } = require('../utils/encryptPassword');
const { validatePass } = require('../utils/validatePassword')
const { cartID } = require('../utils/createIdCart')
const { newRegister } = require('../utils/sendMail');
const { loggerInfo, loggerError } = require('./loggers');

passport.use('login', new LocalStrategy({usernameField: 'email'},
    (email, password, done) => {
        usuarios.findOne({email: email}, (err, user) =>{
            if(err) {
                return done(err);
            }
            if(!user) {
                loggerInfo.info('No se escontro el usuario');
                return done(null, false);
            }
            if(!validatePass(user, password)){
                loggerInfo.info('Contraseña incorrecta');
                return done(null, false);
            }
            return done(null, user);
        })
    }
))


passport.use('signup', new LocalStrategy(
    {passReqToCallback: true, usernameField: 'email'}, async(req, email, password, done) => {
        const idCart = await cartID()
        usuarios.findOne({email: email}, (err, user) =>{
            
            if(err) {
                return done(err);
            }
            if(user) {
                loggerInfo.info('Ya existe un usuario con ese email')
                return done(null, false);
            }
            loggerInfo.info(req.body)
            
            const newUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: email,
                password: encryptPass(password),
                address: req.body.address,
                age: req.body.age,
                phone: req.body.phone,
                avatar: req.file.filename,
                cartRef: idCart
            }
            
            loggerInfo.info(newUser)
            
            
            usuarios.create(newUser, (err, id) => {
                if(err) {
                    loggerError.error('Error en el registro')
                    return done(err)
                }
                loggerInfo.info(id)
                loggerInfo.info('Registrado correctamente')
                newRegister(newUser)
                return done(null, id)
            })
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    usuarios.findById(id, done)
})

module.exports=passport