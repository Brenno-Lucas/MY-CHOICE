import React, { useState } from 'react';
import { Header } from '../components';
import { getItem } from '../services/UseLocalStorage';

export default function Game() {
  const [selectedImg, setImgSelected] = useState('');
  const [enlargeImg, setEnlargeImg] = useState(false);
  const game = getItem('clickedGame');
  const gameObj = getItem('LastDrawGames');
  const gameSelected = gameObj.find((e) => e.name === game);
  const tags = gameSelected.tags.slice(0, 4);


  const expandImg = (e) => {
    const { src } = e.target;
    setImgSelected(src);
    setEnlargeImg(true);
  };

  const closeImage = () => {
    setEnlargeImg(false);
  };

  const toggleImage = (e) => {
    const { id } = e.target;
    const position = id.split('-')[0];
    const screenshots = gameSelected.short_screenshots;
    const arrImg = screenshots.map((img) => img.image);
    const positionImg = arrImg.indexOf(selectedImg);
    if (position === 'left') {
      if (positionImg - 1 === -1)
        setImgSelected(arrImg[arrImg.length - 1])
      else setImgSelected(arrImg[positionImg - 1])
    }
    if (position === 'right') {
      if (positionImg + 1 > arrImg.length - 1)
        setImgSelected(arrImg[0])
      else setImgSelected(arrImg[positionImg + 1])
    }
  }

  return(
    <div>
      <Header />
      <section
        className='game-section'
      >
        <div>
          <p>{gameSelected.name}</p>
          <img
            id='game-selected-image'
            src={gameSelected.background_image}
            alt={gameSelected.name}
          />
        </div>
        <div
          className='game-details'
        >
          <p>Detalhes do jogo</p>
          <table
            id='table-details'
          >
            <tbody>
              <tr>
                <td>Plataformas:</td>
                { gameSelected.platforms.map(({ platform }) => (
                <td
                  key={platform.name}
                >
                  { `${platform.name}` }
                </td>
                ))}
              </tr>
              <tr>
                <td>Metacritic:</td>
                <td>
                  { gameSelected.metacritic }
                </td>
              </tr>
              <tr>
                <td>Gênero:</td>
                { gameSelected.genres.map((item) => (
                  <td
                   key={item.name}
                  >
                    {item.name}
                  </td>
                )) }
              </tr>
              { tags.map((item) => (
                <tr
                  key={item.name}  
                >
                  <td>
                    { item.name[0].toUpperCase() + item.name.substring(1) }
                  </td>
                </tr>
              )) }
            </tbody>
          </table>
          <p>Screenshots</p>
          <div
            id='carrossel'
          >
            { gameSelected.short_screenshots.map((item) => (
              <img
                id='short-screenshots'
                key={ item.id }
                src= { item.image }
                alt= { item.id }
                onClick={ (e) => expandImg(e) }
              />
            )) }
          </div>
          <div>
            { enlargeImg === true && (
              <div>
                <div
                  id='full-screen-img'
                  onClick={ (e) => closeImage(e) }
                >
                </div>
                <section
                  id='change-images'
                >
                <img
                  id= "selected-image"
                  src= { selectedImg }
                  alt= { selectedImg }
                />
                  <div
                    id="left-background-arrow"
                    onClick={ (e) => toggleImage(e) }
                  >
                    <div id="left-arrow" />
                  </div>
                  <div
                    id="right-background-arrow"
                    onClick={ (e) => toggleImage(e) }
                  >
                    <div id="right-arrow" />
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}