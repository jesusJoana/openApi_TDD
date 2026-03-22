const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

app.use(express.json());

const openapiDocument = YAML.load(
    path.join(__dirname, '../openapi/openapi.yaml')
);

const movies = [
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
];

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API funcionando correctamente'
    });
});

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:id', (req, res) => {
    const movieId = Number(req.params.id);
    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
        return res.status(404).json({
            error: 'Película no encontrada'
        });
    }

    res.status(200).json(movie);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

module.exports = app;
