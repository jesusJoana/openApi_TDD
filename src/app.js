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

app.post('/movies', (req, res) => {
    const { title, director } = req.body;

    if (!title || !director) {
        return res.status(400).json({
            error: 'Los campos title y director son obligatorios'
        });
    }

    const newMovie = {
        id: movies.length > 0 ? movies[movies.length - 1].id + 1 : 1,
        title,
        director
    };

    movies.push(newMovie);

    res.status(201).json(newMovie);
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

module.exports = app;

