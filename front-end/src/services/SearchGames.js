import axios from 'axios';

const GetGameSearched = async (gameName) => {
  const getGames = await axios({
    method: 'GET',
    url: `https://my-choice-back-end.vercel.app/games/getAll`,
    headers: { gameName },
  });
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