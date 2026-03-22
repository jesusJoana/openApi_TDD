const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

app.use(express.json());

const openapiDocument = YAML.load(
    path.join(__dirname, '../openapi/openapi.yaml')
);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API funcionando correctamente'
    });
});

app.get('/movies', (req, res) => {
    res.status(200).json([
        {
            id: 1,
            title: 'Inception',
            director: 'Christopher Nolan'
        },
        {
            id: 2,
            title: 'Interstellar',
            director: 'Christopher Nolan'
        }
    ]);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

module.exports = app;
