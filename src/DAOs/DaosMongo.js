const ContenedorMongoDB = require('../containers/mongoContainer')
const chats = require('../models/mongoChatModel')

class DaosMongo extends ContenedorMongoDB{
    constructor(){
        super(chats)
    }

    async getAllChats(){
        try {
            const data = await this.getAllDoc();
            return data;
        } catch (error) {
            return error
        }
    }

    async addNewChat(msg){
        try {
            const data = await this.addDoc(msg);
            return data;
        } catch (error) {
            return error
        }
    }
}

module.exports = DaosMongo;