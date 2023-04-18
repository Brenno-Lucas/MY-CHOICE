import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Game from './pages/Game';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import './styles';

function App() {
  return (
    <Switch>
      <Route exact path='/' component= { Login } />
      <Route exact path='/HomePage' component= { HomePage } />
      <Route exact path='/UserPage' component= { UserPage } />
      <Route exact path='/Game' component= { Game } />
    </Switch>
  );
}

export default App;
