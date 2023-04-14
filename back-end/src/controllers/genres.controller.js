const axios = require('axios');

const { API_KEY } = process.env;
const BASE_URL = 'https://api.rawg.io/api';

const getAllGenres = async (req, res) => {
  const queryParams = {
    key: API_KEY,
  };
  try {
    const response = await axios.get(`${BASE_URL}/genres`, { params: queryParams });
    const filterResponde = response.data.results.map((item) => item.name)
    const data = { genreTypes: filterResponde, data: response.data}
    return res.status(200).json(data)
  }
  catch (error) {
    res.status(500).send('Erro ao obter dados da API.');
  }
}

  module.exports = {
    getAllGenres,
  };