const request = require('supertest');
const app = require('../app');
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

test('GET /categories', async () => {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /categories', async () => {
    const categories = {
        name: 'phones'
    }
    const res = await request(app)
    .post('/categories')
    .send(categories)
    .set('Authorization', `Bearer ${token}`)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(categories.name);
});

test("DELETE  /catgories/:id debe de eliminar un usuario ", async() => {
    const res = await request(app)
    .delete(`/categories/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
});