import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../providers/auth';
import { AutoComplete } from '..';
import { Button, Input } from '../Elements';
import { validateLength, checkInput, handleChange } from '../../services/Validation'
import { getSearch } from '../../services/SearchData';
import { saveItem, getItem } from '../../services/UseLocalStorage';
import RaffledGame from './RaffledGame';

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
    const raffle = async () => {
      const gameSearched = await getSearch('name', isDrawGame, 'games');
      setGameObj(await gameSearched[0]);
    };
    if (isDrawGame !== '') {
      raffle();
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
      <div
        className='initial-page'
      >
        <div
          className='div-search'
        >
          <div
          className='search-game'
          >
            <Input 
              id='game-name-input'
              type="text"
              name="gameName"
              value={ addGame.gameName }
              onChange= { (e) => handleChange(e, setIsAddGame) }
            />
            <Button 
              buttonName="Adicionar"
              id='add-game-button'
              onClick= { addButton }
              type="button"
              disabled={ isButtonDisabled }
            />
            <Button 
              buttonName="Sortear"
              id='draw-game-button'
              onClick= { drawButton }
              type="button"
              disabled={ gameList.length === 0 }
            />
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
                <Button 
                  buttonName="X"
                  id="remove-game-button"
                  onClick={ (e) => removeGame(e) }
                  type="button"
                  value={ gameName }
                />
                </p>
              )
            }
          </div>
        </div>
        { isDrawGame !== '' && Object.keys(isGameObj).length !== 0 && (
          <RaffledGame 
            name= { isGameObj.name }
            img= { isGameObj.background_image }
          />
        )}
      </div>
    </div>
  )
}