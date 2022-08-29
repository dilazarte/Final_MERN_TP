const {graphqlHTTP} = require('express-graphql')
const { schemaProds, rootValues } = require('../controllers/graphqlController');
const {Router} = require('express');

const graphqlRouter = Router()

graphqlRouter.post('/', graphqlHTTP({
    schema: schemaProds,
    rootValue: rootValues,
    graphiql: true
}))

module.exports = {graphqlRouter};