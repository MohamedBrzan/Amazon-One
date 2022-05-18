import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const IsLogged = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState({ success: false, user: {} });

  const checkUserLoggedIn = async () => {
    try {
      await axios({
        method: 'get',
        url: '/api/v1/user/logged',
      }).then((res) =>
        setLoggedIn({
          success: res.data.success,
          user: res.data.user,
        })
      );
    } catch (error) {
      setLoggedIn({ success: false, user: {} });
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
