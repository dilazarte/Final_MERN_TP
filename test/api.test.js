const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect
//const app = require('../server')
let idNewProd = null;

describe('GET /api/productos', ()=>{
    it('El status code debe ser 200', async()=>{
        let res = await request.get('/api/productos/')
        expect(res.status).to.eql(200)
    })
    it('Debe retornar 6 productos', async ()=>{
        let res = await request.get('/api/productos/')
        expect(res.body.length).to.eql(6)
    })
    it('El producto retornado debe ser "Heladera"', async()=>{
        let res = await request.get('/api/productos/62e5b31bb49ab6ea8eeedea5')
        expect(res.body.nombre).to.eql('Heladera')
    })
})

describe('POST /api/productos', ()=>{
    it('Debe retornar error al enviar un producto incompleto', async ()=>{
        let newProd = {nombre: 'test', precio: 5000}
        let res = await request.post('/api/productos/').send(newProd)
        expect(res.body).to.eql({error: 'Verifique los datos'})
    })
    it('Debe retornar producto Cargado', async ()=>{
        let newProd = {
            nombre: "Cafetera Atma",
            descripcion: "Cafetera marca ATMA",
            foto: "https://dummyimage.com/400x400/000/ffffff.png&text=Fafetera+ATMA",
            codigo: "C4567",
            precio: 12000,
            stock: 16
        }
        let resNewProd = await request.post('/api/productos/').send(newProd)
        idNewProd = resNewProd._body._id
        console.log(idNewProd)
        expect(resNewProd._body.nombre).to.eql(newProd.nombre)
        
    })
})

describe('PUT /api/productos/:id', ()=>{
    it('Debe borrarse el producto creado para el test', async ()=>{
        let res = await request.put(`/api/productos/${idNewProd}`).send({nombre: 'Cafetera Atma Editada'})
        expect(res.body).to.eql({
                "acknowledged": true,
                "modifiedCount": 1,
                "upsertedId": null,
                "upsertedCount": 0,
                "matchedCount": 1
            })
    })
})

describe('DELETE /api/productos/:id', ()=>{
    it('Debe borrarse el producto creado para el test', async ()=>{
        let res = await request.delete(`/api/productos/${idNewProd}`)
        expect(res.body).to.eql({
                "acknowledged": true,
                "deletedCount": 1
            })
    })
})