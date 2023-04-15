import React from "react";
import propTypes from 'prop-types';

export default function RaffledGame(props) {

  const { name, img } = props;

  return(
      <div
        className='raffledItem'
      >
        <p
          id='game-draw-name'
        >
          { name }
        </p>
        <img
          id='game-image'
          src={ img }
          alt={ name }
        />
    </div>
  )
}

RaffledGame.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
};