const axios = require('axios');
  
const { API_KEY } = process.env;
const BASE_URL = 'https://api.rawg.io/api';

const getAll = async (req, res) => {
  const { name } = req.headers;
  const queryParams = {
    key: API_KEY,
    search: name,
  };
  try {
    const response = await axios.get(`${BASE_URL}/publishers`, { params: queryParams });
    res.status(200).json(response.data.results.map((publisher) => publisher.name));
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter dados da API.');
  }
};

module.exports = {
  getAll,
};