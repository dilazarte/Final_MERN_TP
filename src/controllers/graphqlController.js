const {buildSchema} = require('graphql');
const { getProds, getProdById, putProdsQL, postProdsQL, deleteProdsQL } = require("../services/prodsServices");

const schemaProds = buildSchema(`
    type Producto {
        _id: ID!
        nombre: String,
        descripcion: String,
        foto: String,
        codigo: String,
        precio: Int,
        stock: Int,
        timeStamp: Float
    }
    type DeletedData {
        acknowledged: Boolean,
        deletedCount: Int
    }
    type Query {
        getProds: [Producto],
        getProdById(_id: ID!): Producto
    }
    input InputData {
        nombre: String,
        descripcion: String,
        foto: String,
        codigo: String,
        precio: Int,
        stock: Int,
    }
    type Mutation {
        putProdsQL(_id: ID!, input: InputData): Producto
        postProdsQL(input: InputData): Producto
        deleteProdsQL(_id: ID!): DeletedData
    }
`)

//Estos metodos estan ubicados en la capa de servicios, para las acciones actualizar y eliminar se crearon nuevos metodos para graphql
//Para obtener todos y por id se reutilizaron metodos ya existente que funcionan con RESTful.-

const rootValues = {
    getProds,
    getProdById,
    putProdsQL,
    postProdsQL,
    deleteProdsQL
}

module.exports = {schemaProds, rootValues}