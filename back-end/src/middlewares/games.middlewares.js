const metacriticFilter = (response, metacritic) => {
  const filterMetacritc = response.filter((games) => (Number(games.metacritic) > Number(metacritic)));
  return filterMetacritc;
};

  module.exports = {
    metacriticFilter,
  };