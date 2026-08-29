import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import apiClient from "../api/apiClient";


const AuthContext = createContext(null);


const TOKEN_KEY = "rag_assistant_token";
const USER_KEY = "rag_assistant_user";


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);


  // --------------------------------
  // Restore authentication
  // --------------------------------

  useEffect(() => {

    const token =
      localStorage.getItem(TOKEN_KEY);

    const savedUser =
      localStorage.getItem(USER_KEY);


    if (token && savedUser) {

      try {

        setUser(
          JSON.parse(savedUser)
        );

        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`;

      } catch (error) {

        localStorage.removeItem(
          TOKEN_KEY
        );

        localStorage.removeItem(
          USER_KEY
        );

      }

    }


    setIsLoading(false);

  }, []);


  // --------------------------------
  // Login
  // --------------------------------

  const login = (
    token,
    userData
  ) => {

    localStorage.setItem(
      TOKEN_KEY,
      token
    );

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(userData)
    );


    apiClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;


    setUser(userData);
  };


  // --------------------------------
  // Logout
  // --------------------------------

  const logout = () => {

    localStorage.removeItem(
      TOKEN_KEY
    );

    localStorage.removeItem(
      USER_KEY
    );


    delete apiClient
      .defaults
      .headers
      .common
      .Authorization;


    setUser(null);
  };


  const value = {

    user,

    login,

    logout,

    isAuthenticated:
      Boolean(user),

    isLoading,

  };


  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {

  const context =
    useContext(AuthContext);


  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }


  return context;
}