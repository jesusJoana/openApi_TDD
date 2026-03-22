const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

test('GET / debe responder 200', async () => {
    const response = await request(app).get('/');
    assert.equal(response.statusCode, 200);
});

test('GET / debe responder con JSON', async () => {
    const response = await request(app).get('/');
    assert.match(response.headers['content-type'], /json/);
});

test('GET / debe devolver el mensaje esperado', async () => {
    const response = await request(app).get('/');
    assert.deepEqual(response.body, {
        message: 'API funcionando correctamente'
    });
});

test('GET /movies debe responder 200', async () => {
    const response = await request(app).get('/movies');
    assert.equal(response.statusCode, 200);
});

test('GET /movies debe responder con JSON', async () => {
    const response = await request(app).get('/movies');
    assert.match(response.headers['content-type'], /json/);
});

test('GET /movies debe devolver un array', async () => {
    const response = await request(app).get('/movies');
    assert.equal(Array.isArray(response.body), true);
});

test('GET /movies debe devolver películas con id, title y director', async () => {
    const response = await request(app).get('/movies');

    assert.equal(response.body.length > 0, true);
    assert.equal(typeof response.body[0].id, 'number');
    assert.equal(typeof response.body[0].title, 'string');
    assert.equal(typeof response.body[0].director, 'string');
});

test('GET /movies/1 debe responder 200', async () => {
    const response = await request(app).get('/movies/1');
    assert.equal(response.statusCode, 200);
});

test('GET /movies/1 debe devolver una película', async () => {
    const response = await request(app).get('/movies/1');

    assert.deepEqual(response.body, {
        id: 1,
        title: 'Inception',
        director: 'Christopher Nolan'
    });
});

test('GET /movies/99 debe responder 404', async () => {
    const response = await request(app).get('/movies/99');
    assert.equal(response.statusCode, 404);
});

test('GET /movies/99 debe devolver un mensaje de error', async () => {
    const response = await request(app).get('/movies/99');

    assert.deepEqual(response.body, {
        error: 'Película no encontrada'
    });
});

test('POST /movies debe responder 201 cuando los datos son válidos', async () => {
    const response = await request(app)
        .post('/movies')
        .send({
            title: 'The Prestige',
            director: 'Christopher Nolan'
        });

    assert.equal(response.statusCode, 201);
});

test('POST /movies debe devolver la película creada', async () => {
    const response = await request(app)
        .post('/movies')
        .send({
            title: 'Dunkirk',
            director: 'Christopher Nolan'
        });

    assert.equal(typeof response.body.id, 'number');
    assert.equal(response.body.title, 'Dunkirk');
    assert.equal(response.body.director, 'Christopher Nolan');
});

test('POST /movies debe responder 400 si falta title', async () => {
    const response = await request(app)
        .post('/movies')
        .send({
            director: 'Christopher Nolan'
        });

    assert.equal(response.statusCode, 400);
});

test('POST /movies debe responder 400 si falta director', async () => {
    const response = await request(app)
        .post('/movies')
        .send({
            title: 'Memento'
        });

    assert.equal(response.statusCode, 400);
});

test('POST /movies debe devolver mensaje de error si faltan campos obligatorios', async () => {
    const response = await request(app)
        .post('/movies')
        .send({});

    assert.deepEqual(response.body, {
        error: 'Los campos title y director son obligatorios'
    });
});
