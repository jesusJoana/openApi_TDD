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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

module.exports = app;
