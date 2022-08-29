const nodemailer = require('nodemailer');
const { loggerInfo, loggerError } = require('./loggers');
require('dotenv').config()

const ADMIN_MAIL = 'dilazarte@gmail.com';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: ADMIN_MAIL,
        type: 'OAuth2',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN
    }
});



async function newRegister(data){
    const mailOptions = {
        from: 'ADMIN',
        to: ADMIN_MAIL,
        subject: 'Nuevo Registro',
        html:`
            <h3>Nuevo usuario registrado</h3>
            <div>
                <p>Nombre: <span style="font-weight: bold;">${data.firstName}</span></p>
                <p>Apellido: <span style="font-weight: bold;">${data.lastName}</span></p>
                <p>Email: <span style="font-weight: bold;">${data.email}</span></p>
                <p>Dirección: <span style="font-weight: bold;">${data.address}</span></p>
                <p>Teléfono: <span style="font-weight: bold;">${data.phone}</span></p>
            </div>
        `
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        loggerInfo.info(info);
    } catch (error) {
        loggerError.error(error);
    }
}

async function newOrder(user, data){

    const prods = data.map(el => {
        return(
            `
                <tr>
                    <td>${el.descripcion}</td>
                    <td>${el.precio}</td>
                </tr>
            `
        )
    }).join('')

    const mailOptions = {
        from: 'ADMIN',
        to: [ADMIN_MAIL, user.email],
        subject: 'Nuevo Pedido',
        html:`
            <h2>Nuevo pedido de compra de: </h2>
            <h3><span style="font-weight: bold;">${user.firstName} ${user.lastName}</span> - 
            <span style="font-weight: bold;">${user.email}</span></h3>
            <br>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    ${prods}
                </tbody>
            </table>
        `
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        loggerInfo.info(info)
    } catch (error) {
        loggerError.error(error);
    }
}



module.exports = {newRegister, newOrder}