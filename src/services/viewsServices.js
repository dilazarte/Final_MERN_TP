const {faker} = require('@faker-js/faker');
faker.locale = 'es'

async function fakerProds(){
    const products = []
    for(let i = 0; i < 5; i++){
        let product = {
            id: faker.random.numeric(),
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(500, 1500),
            foto: faker.image.image(50,50)
        }
        products.push(product)
    }
    return products;
}



module.exports = {fakerProds}