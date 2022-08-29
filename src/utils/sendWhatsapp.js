const { loggerInfo, loggerError } = require('./loggers');
require('dotenv').config();
const accountSid = process.env.TWILIO_ID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendWhatsapp(user, data){
    const msg = data.map(el => {
        return(`
        ✅ *${el.descripcion}* - precio: *$${el.precio}*
        `
        )
    }).join('')
    client.messages
    .create({
        body: 
        `
        El usuario ${user.firstName} ${user.lastName} - ${user.email} ha realizado el siguiente pedido:
        
        ${msg}
        `,
        from: 'whatsapp:+14155238886',
        to: process.env.WHATSAPP_ADMIN
    })
    .then(message => loggerInfo.info(message))
    .catch(err => loggerError.error(err))
    .done();
}

module.exports = {sendWhatsapp}