import axios from 'axios';

const GetGameSearched = async (gameName) => {
  const getGames = await axios({
    method: 'GET',
    url: `http://localhost:3001/games/getAll`,
    headers: { gameName },
  });
  console.log(getGames.data);
  return getGames.data;
};

const GetGameId = (gameList, gameName) => {
  const gameId = gameList.find((game) => game.name === gameName).appid;
  return gameId;
};

export {
  GetGameId,
  GetGameSearched,
};