import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [selectedGame, setSelectedGame] = useState('');
  const [typeSearch, setTypeSearch] = useState('');

  return (
    <AuthContext.Provider value={{ selectedGame, setSelectedGame, typeSearch, setTypeSearch }}>
      {props.children}
    </AuthContext.Provider>
  )
}