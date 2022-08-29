// const DaoProductosMongo =  require('../DAOs/DaosMongoProductos')
// const daoProdsMongo = new DaoProductosMongo()

const prodFactory = require('../factories/prodsMongoFactory')
const dbProdsFactory = prodFactory.createInstance()

async function getProds(){
    const allProds = await dbProdsFactory.getAllDoc()
    return allProds
}

async function getProdById(id){
    const prodById = await dbProdsFactory.getDocById(id)
    return prodById
}

async function postProds(newProducto){
    if(newProducto && newProducto.nombre && newProducto.descripcion && newProducto.foto && newProducto.codigo && newProducto.precio && newProducto.stock){
        newProducto.precio = parseInt(newProducto.precio)
        newProducto.stock = parseInt(newProducto.stock)
        const id = await dbProdsFactory.addDoc(newProducto)
        return id;
    }else{
        return {error: 'Verifique los datos'}
    }
}

async function putProds(id, dataToUpdate){
    const data = await dbProdsFactory.updateDoc(id, dataToUpdate)
    return data;
}


//funciones GRAPHQL
async function putProdsQL({_id, input}){
    let updated = await dbProdsFactory.updateDoc(_id, input)
    if(updated) {
        const updatedProd = await getProdById(_id)
        return updatedProd
    }
}

async function postProdsQL(data){
    if(data.input && data.input.nombre && data.input.descripcion && data.input.foto && data.input.codigo && data.input.precio && data.input.stock){
        data.input.precio = parseInt(data.input.precio)
        data.input.stock = parseInt(data.input.stock)
        const id = await dbProdsFactory.addDoc(data.input)
        return id;
    }else{
        return {error: 'Verifique los datos'}
    }
}

async function deleteProdsQL({_id}){
    let data = await dbProdsFactory.deleteDoc(_id)
    return data
}
//------funciones GRAPHQL

async function deleteProds(id){
    const data = await dbProdsFactory.deleteDoc(id)
    return data;
}


module.exports = {getProds, getProdById, postProds, putProds, deleteProds, putProdsQL, postProdsQL, deleteProdsQL}