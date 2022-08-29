const daoProds = require('../DAOs/DaosMongoProductos')
const minimist = require('minimist')
const defaultOp = {
    default: {dbMode: 'MONGO'},
    alias: {db:'dbMode'}
};
const args = minimist(process.argv.slice(2), defaultOp);

class prodsMongoFactory{
    static createInstance(){
        switch(args.dbMode){
            case 'MONGO': return new daoProds()
            default: return new daoProds()
        }
    }
}

module.exports = prodsMongoFactory;
