const express = require('express');
const cors = require('cors');
require('dotenv').config()

const GamesRoute = require('./routes/games.router');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'DELETE', 'PATCH'],
};

app.use(express.json());
app.use(express.static('public'));

app.use(cors(corsOptions));

app.use('/games', GamesRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});