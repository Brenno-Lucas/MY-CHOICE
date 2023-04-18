import React, { useContext, useState, useEffect } from 'react';
import { box } from '../../images';
import { Button } from '../Elements';
import { AuthContext } from '../../providers/auth';
import { getSearch } from '../../services/SearchData';

export default function InitialPage() {
  const { setTypeSearch } = useContext(AuthContext)
  const [bestGames, setBestGames] = useState([]);
  const [raffledGames, setRaffledGames] = useState([]);

  useEffect(()=> {
    const getBestGames = async () => {
      const games = await getSearch('metacritic', '85', 'metacritic');
      setBestGames(games);
    };
    getBestGames();
    if (raffledGames.length === 0) {
      if (bestGames.length > 0) {
        const raflle = () => {
          const shuffledArr = bestGames.slice().sort(() => Math.random() - 0.5);
          const arr = shuffledArr.slice(0, 12);
          setRaffledGames(arr);
        };
        raflle();
      }
    }
  }, [bestGames, raffledGames]);


  return(
    <div
      id="initial-page"
    >
      <section
        id="text-section"
      >
        <h1>
          MY CHOICE
        </h1>
        <p>
          para evitar aquela dúvida rotineira de todos os gamers, vai decidir qual será o jogo da vez.
        </p>
        <section
          id='type-search-section'
        >
          <hr />
          <h3>ESCOLHA UMA OPÇÃO</h3>
          <div>
            <Button 
              buttonName="MANUAL"
              id="type-search-btn"
              onClick={ () => setTypeSearch('manual') }
              type="button"
            />
            <Button 
              buttonName="FILTROS"
              id="type-search-btn"
              onClick={ () => setTypeSearch('filter') }
              type="button"
            />
                      
          </div>
        </section>
      </section>
      <section
        id='box-section'
      >
        <div
          id='box-div'
        >
          <div
            className="container"
          >
            <img
              id="box-img"
              src={ box }
              alt="box"
            />
            { raffledGames.map((item, index) => (
              <img
                key={ index }
                className='img-circle'
                id={ `img-circle-${index}` }
                src={ item.background_image }
                alt='img'
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}