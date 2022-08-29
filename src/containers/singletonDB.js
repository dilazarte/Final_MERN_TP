const mongoose = require('mongoose')
const {loggerInfo} = require('../utils/loggers');
let connectionInstance = null;

class SingletonDB{
    constructor(dbURI){
        if(!connectionInstance){
            connectionInstance = this;
            this.db = mongoose.connect(dbURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, ()=> loggerInfo.info('Connected to db'));
        }else{
            return connectionInstance
        }
    }
    get connectDB(){
        return this.db
    }
}

module.exports = SingletonDB;