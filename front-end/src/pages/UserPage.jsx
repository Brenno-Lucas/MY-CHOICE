import React from 'react';
import { Footer, Header, UserData } from '../components';
import { getItem, saveItem } from '../services/UseLocalStorage';
import { useHistory } from 'react-router-dom';

export default function UserPage() {

  const games = getItem('LastDrawGames');
  const history = useHistory();

  const onClick = (e) => {
    const gameName = e.target;
    saveItem('clickedGame', gameName.alt)
    history.push(`/Game`);
  };
  
  console.log(!games);

  return(
    <div>
      <Header />
      <UserData />
      <section
        className='saved-games'
      >
        { !!games && games.map(({ name, background_image }) => (
            <div
              className='saved-game'
              key={ name }
            >
              <p>
                { name }
              </p>
              <img
                id='picture'
                src={ background_image }
                alt={ name }
                onClick= { (e)=> (onClick(e)) }
              />
            </div>
        ))
        }
      </section>
      <Footer />
    </div>
  )
}