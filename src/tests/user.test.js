const request = require('supertest');
const app = require('../app');
let id;
let token;



test('POST /users/login', async () => {
    const body = {
        email: "fjsasshh@gmail.com",
        password:"fdsyyyssfsdfs"
    }
    const res = await request(app).post('/users/login').send(body);
    token = res.body.token;
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined();
});

test('GET /users', async () => {
    const res = await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /users', async () => {
    const user = {
        firstName: "se actu1a3lizosshgg el n1ombre",
        lastName: "se actuali3zsso sael ape1llido",
        email: "fjsass1113hh@gmail.com",
        phone: "34532uuu31ss31153",
        password:"fdsyyy1113ssfsdfs"
    }
    const res = await request(app).post('/users').send(user)
    console.log(res.body)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});

test('/POST /users/login debe de retornar credenciales incorrectas', async () => {
    const body = {
        email:' incorrecto@gmail.com',
        password: 'dfsjdfskfshf12234'
    }

    const res = await request(app).post('/users/login').send(body)
    expect(res.status).toBe(401)
});

test("PUT /users/:id debe de actualizar un usuario", async () => {
    const user = {
        firstName:"genre actualizado"
    }
    const res = await request(app).put(`/users/${id}`)
    .send(user)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
});

test("DELETE  /users/:id debe de eliminar un usuario ", async() => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
});