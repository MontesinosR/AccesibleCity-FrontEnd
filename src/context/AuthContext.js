import { createContext, useEffect } from "react";
import { useState } from "react";
import { getMyUserDataService } from "../services";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  //Cada vez que cambia el token se guarda en localStorage

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyUserDataService(token);
        //conseguir acceso a email
        setUser(data);
      } catch (error) {
        logout();
      }
    };

    if (token) {
      getUserData();
    }
  }, [token]);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
