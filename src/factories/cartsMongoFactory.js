const daoCarts = require('../DAOs/DaosMongoCarrito')
const minimist = require('minimist')
const defaultOp = {
    default: {dbMode: 'MONGO'},
    alias: {db:'dbMode'}
};
const args = minimist(process.argv.slice(2), defaultOp);

class cartsMongoFactory{
    static createInstance(){
        switch(args.dbMode){
            case 'MONGO': return new daoCarts()
            default: return new daoCarts()
        }
    }
}

module.exports = cartsMongoFactory;
