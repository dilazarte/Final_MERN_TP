const daoOrders = require('../DAOs/DaosMongoOrdenes')
const minimist = require('minimist')
const defaultOp = {
    default: {dbMode: 'MONGO'},
    alias: {db:'dbMode'}
};
const args = minimist(process.argv.slice(2), defaultOp);

class ordersMongoFactory{
    static createInstance(){
        switch(args.dbMode){
            case 'MONGO': return new daoOrders()
            default: return new daoOrders()
        }
    }
}

module.exports = ordersMongoFactory;
