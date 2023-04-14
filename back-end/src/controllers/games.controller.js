const axios = require('axios');
  
const { API_KEY } = process.env;
const BASE_URL = 'https://api.rawg.io/api';

const getGameSearched = async (req, res) => {
  const { gamename } = req.headers;
  const queryParams = {
    key: API_KEY,
    page_size: 5,
    search: gamename,
  };
  try {
    const response = await axios.get(`${BASE_URL}/games`, { params: queryParams });
    res.status(200).json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter dados da API.');
  }
};

module.exports = {
  getGameSearched,
};
