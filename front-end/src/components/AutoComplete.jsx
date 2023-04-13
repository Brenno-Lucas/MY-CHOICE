import React, { useState, useEffect } from 'react';
import { AuthContext } from '../providers/auth';
import { GetGameSearched } from '../services/SearchGames';
import propTypes from 'prop-types';

export default function AutoComplete(props) {

  const { setSelectedGame } = React.useContext(AuthContext)
  const { testGameName } = props;
  const [games, setGames] = useState([]);

  const gamesSearch = async (param) => {
    const getGames = await GetGameSearched(param);
    const gamesSearched = getGames.filter((item) => {
      const names = item.name.toLowerCase().replaceAll(' ', '');
      return names.includes(param.toLowerCase().replaceAll(' ', ''));
    });
    setGames(gamesSearched);
  }

  const insertGameName = (e) => {
    const { target } = e;
    console.log(target.innerText);
    setSelectedGame(target.innerText);
    setGames([]);
  };

  useEffect(()=> {
    if (testGameName && testGameName.length > 3)
      gamesSearch(testGameName);
  }, [testGameName]);

  return (
    <>
      {games.length > 0 && (
      <div
        className='auto-complete'
      >
        { games.map(({ name }) => (
        <span
          key={ name }
          name= { name }
          id='game-name'
          onClick={ (e) => insertGameName(e) }
        >
          { name }
        </span>
        ))}
      </div> 
      )}
    </>
  )
}

AutoComplete.propTypes = {
  testGameName: propTypes.string.isRequired,
};