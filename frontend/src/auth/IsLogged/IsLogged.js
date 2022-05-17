import { createContext, useEffect } from 'react';

const AuthContext = createContext();

const IsLogged = () => {
  useEffect(() => {}, []);

  return <div>IsLogged</div>;
};

export default IsLogged;
