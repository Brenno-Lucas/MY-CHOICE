import axios from 'axios';

const getAllGenres = async () => {
  const getGames = await axios({
    method: 'GET',
    url: `https://my-choice-back-end.vercel.app/genres/getAll`,
  });
  return getGames.data;
};

const getSearch = async (name, value, param) => {
  const search = await axios({
    method: 'GET',
    url: `https://my-choice-back-end.vercel.app/${param}/getAll`,
    headers: { [name]: value },
  });
  return search.data;
};

export {
  getSearch,
  getAllGenres,
};