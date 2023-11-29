const request = require('supertest');
const app = require('../app');
require('../models')
let id;
let token;

beforeAll(async() => {
    const user = {
        email: 'test@gmail.com',
        password: 'test1234'
    }
    const res = await request(app).post('/users/login').send(user)
    token = res.body.token
})

test('GET /products', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /products', async () => {
    const products = {

        title: "product.title cannot be null",
        descriptiom: "product.descriptiom cannot be null",
        brand: "product.brand cannot be null",
        price: 12.000
    }
    const res = await request(app)
    .post('/products')
    .send(products)
    .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(products.title);
});

test("DELETE  products/:id debe de eliminar un usuario ", async() => {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
});