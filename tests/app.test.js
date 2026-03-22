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
