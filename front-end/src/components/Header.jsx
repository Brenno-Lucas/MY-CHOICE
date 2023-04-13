import React from 'react';
import { getItem, clearUser } from '../services/UseLocalStorage';
import { useHistory } from 'react-router-dom';

export default function InitialPage() {
  const history = useHistory();
  const { UserName, UserImage } = getItem('UserData');
  
  const onClick = (test) => {
    history.push(test);
  };

  return(
    <div
    className='header'
    >
      <div></div>
      <h1
        id='my-choice'
        onClick={ () => (onClick('/HomePage')) }
      >
        MY CHOICE
      </h1>
      <section
        className='profile-container'
      >
        <p
          id='header-user-name'
        >
          { UserName }
        </p>
        <img
          id='profile-picture'
          src= { UserImage }
          alt="profile"
          onClick={ () => (onClick('/UserPage')) }
        />
        <p
          onClick={ () => {
            clearUser();
            history.push('/');
          } }
        >
          Sair
        </p>
      </section>
    </div>
  )
}