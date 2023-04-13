const axios = require('axios');

const getGameSearched = async (req, res) => {
  const { API_KEY } = process.env;
  const { gamename } = req.headers;
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=5&search=${gamename}`);
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter dados da API.');
  }
};

module.exports = {
  getGameSearched,
};
