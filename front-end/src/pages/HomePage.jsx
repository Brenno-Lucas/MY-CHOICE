import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../providers/auth';
import { Header, AutoComplete } from '../components';
import { validateLength, checkInput, handleChange } from '../services/Validation'
import { GetGameSearched } from '../services/SearchGames';
import { saveItem, getItem } from '../services/UseLocalStorage'

export default function HomePage() {
  const { selectedGame, setSelectedGame } = useContext(AuthContext)
  const [addGame, setIsAddGame] = useState({ gameName: '' });
  const [validGame, setIsValidGame] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isDrawGame, setIsDrawGame] = useState('');
  const [gameList, setGameList] = useState([]);
  const [isGameObj, setGameObj] = useState({});
  const [saveGames, setSaveGames] = useState([]);

  const { gameName } = addGame;

  useEffect(()=> {
    validateLength(2, gameName, setIsValidGame);
    checkInput(setIsButtonDisabled, [validGame]);
  }, [gameName, validGame, gameList]);

  useEffect(()=> {
    if (selectedGame !== '')
    setIsAddGame(() => ({ gameName: selectedGame }));
  }, [selectedGame])

  useEffect(()=> {
    const raffledGame = async () => {
      const gameSearched = await GetGameSearched(isDrawGame);
      setGameObj(await gameSearched[0]);
    };
    if (isDrawGame !== '') {
      raffledGame();
    };
    if (selectedGame !== '')
      setIsAddGame(() => ({ gameName: selectedGame }));
  }, [isDrawGame, selectedGame]);

  useEffect(()=> {
    if (saveGames.find(e => e.name === isGameObj.name) === undefined && Object.keys(isGameObj).length !== 0) {
      setSaveGames((state) => ([
        ...state,
        isGameObj,
      ]));
    };
    if (saveGames.length > 5) {
      saveGames.shift();
    };
    if (getItem('LastDrawGames') === null && saveGames.length === 0) {
      saveItem('LastDrawGames', saveGames);
    }
    else if (getItem('LastDrawGames').length === 0 && saveGames.length > 0) {
      saveItem('LastDrawGames', saveGames);
    }
    else if (getItem('LastDrawGames').length > 0 && saveGames.length === 0) {
      const jogosSalvos = getItem('LastDrawGames');
      setSaveGames(jogosSalvos);
    }
    saveItem('LastDrawGames', saveGames);
  }, [isGameObj, saveGames]);

  const drawButton = () => {
    if (gameList.length > 0) {
      const luckyGame = gameList[Math.floor(Math.random() * gameList.length)];
      setIsDrawGame(luckyGame);
    };
  };

  const addButton = () => {
    if (!gameList.includes(gameName))
      setGameList((prevState) => [...prevState, gameName]);
      setIsAddGame(() => ({ gameName: '' }));
      setSelectedGame('')
  };

  const removeGame = (e) => {
    const { target } = e;
    const filter = gameList.filter((t) => t !== target.value);
    setGameList(filter);
  };

  return(
    <div>
      <Header />
      <div
      className='initial-page'
      >
        <div
          className='div-search'
        >
          <div
          className='search-game'
          >
            <input
              id='game-name-input'
              type="text"
              name="gameName"
              value={ addGame.gameName }
              onChange= { (e) => handleChange(e, setIsAddGame) }
            />
            <button
              type='button'
              id='add-game-button'
              disabled={ isButtonDisabled }
              onClick= { addButton }
            >
              Adicione
            </button>
            <button
              type='button'
              id='draw-game-button'
              disabled={ gameList.length === 0 }
              onClick= { drawButton }
            >
              Sortear
            </button>
          </div>
          { gameName.length > 0 && (
            <AutoComplete
            testGameName= { gameName }
            />
          )}
          <div
            className='game-list'
          >
            { gameList.length !== 0 && gameList.map((gameName)=>
                <p
                  key={ gameName }
                >
                  { gameName }
                <button
                id='remove-game-button'
                value={ gameName }
                onClick={ (e) => removeGame(e) }
                >
                  X
                </button>
                </p>
              )
            }
          </div>
        </div>
        { isDrawGame !== '' && (
          <div
            className='raffledItem'
          >
            <p
              id='game-draw-name'
            >
              { isGameObj.name }
            </p>
            <img
              id='game-image'
              src={isGameObj.background_image}
              alt={ isGameObj.name }
            />
        </div>
        )}
      </div>
    </div>
  )
}