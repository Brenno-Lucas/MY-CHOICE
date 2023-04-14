const express = require('express');
const cors = require('cors');
require('dotenv').config()

const GamesRoute = require('./routes/games.router');
const GenresRoute = require('./routes/genres.router');

const app = express();

const corsOptions = {
  origin: 'https://my-choice-front-end.vercel.app',
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
};

app.use(express.json());
app.use(express.static('public'));

app.use(cors(corsOptions));

app.use('/games', GamesRoute);

app.use('/genres', GenresRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});