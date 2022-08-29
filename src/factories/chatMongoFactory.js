const daoChat = require('../DAOs/DaosMongo')
const minimist = require('minimist')
const defaultOp = {
    default: {dbMode: 'MONGO'},
    alias: {db:'dbMode'}
};
const args = minimist(process.argv.slice(2), defaultOp);

class chatMongoFactory{
    static createInstance(){
        switch(args.dbMode){
            case 'MONGO': return new daoChat()
            default: return new daoChat()
        }
    }
}

module.exports = chatMongoFactory;
