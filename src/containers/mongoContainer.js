const SingletonDB = require('./singletonDB');
require('dotenv').config();

const URL = process.env.MONGO_URI;


class ContenedorMongoDB {
    constructor(model){
        this.connection = new SingletonDB(URL)
        this.model = model
    }

    async getDoc(data){
        try {
            const item = await this.model.findOne(data)
            return item
        } catch (error) {
            return error
        }
    }
    
    async getDocById(id){
        try {
            const item = await this.model.findOne( {_id: id} )
            return item
        } catch (error) {
            console.log('error', error)
            return error
        }
    }

    async getAllDoc(){
        try {
            const items = await this.model.find({})
            return items;
        } catch (error) {
            return error
        }
    }

    async addDoc(obj){
        try {
            obj.timeStamp = Date.now()
            const newItem = await this.model.create(obj);
            return newItem;
        } catch (error) {
            return error
        }
    }

    async updateDoc(id, data){
        try {
            const updateItem = await this.model.updateOne({_id: id}, {$set: data});
            return updateItem;
        } catch (error) {
            return error
        }
    }

    async deleteDoc(id){
        try {
            const deleteItem = await this.model.deleteOne({_id: id})
            return deleteItem;
        } catch (error) {
            return error
        }
    }
}

module.exports = ContenedorMongoDB