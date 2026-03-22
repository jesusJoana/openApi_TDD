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

