const axios = require('axios');

const GamesMiddlewares = require('../middlewares/games.middlewares');

const { API_KEY } = process.env;
const BASE_URL = 'https://api.rawg.io/api';

const getAll = async (req, res) => {
  const { metacritic } = req.headers;
  const queryParams = {
    key: API_KEY,
  };
  try {
    const response = await axios.get(`${BASE_URL}/games`, { params: queryParams });
    if (metacritic !== 'null') {
      const filter = GamesMiddlewares.metacriticFilter(response.data.results, metacritic);
      return res.status(200).json(filter)
    } else {
      return res.status(200).json(response.data)
    }
  }
  catch (error) {
    res.status(500).send('Erro ao obter dados da API.');
  }
}

module.exports = {
  getAll,
};