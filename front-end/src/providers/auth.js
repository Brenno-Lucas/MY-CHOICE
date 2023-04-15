import React, { useState } from "react";

export const AuthContext = React.createContext({});

export const AuthProvider = (props) => {
  const [selectedGame, setSelectedGame] = useState('');

  return (
    <AuthContext.Provider value={{ selectedGame, setSelectedGame }}>
      {props.children}
    </AuthContext.Provider>
  )
}