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

  // Restore authentication from stored JWT
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setIsLoading(false);
        return;
      }

      // Attach token to Axios
      apiClient.defaults.headers.common.Authorization =
        `Bearer ${token}`;

      try {
        // Verify token and get the real current user
        const response = await apiClient.get("/auth/me");

        const currentUser = response.data;

        localStorage.setItem(
          USER_KEY,
          JSON.stringify(currentUser)
        );

        setUser(currentUser);
      } catch (error) {
        console.error(
          "SESSION RESTORE ERROR:",
          error.response?.data || error
        );

        // Token is invalid/expired
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        delete apiClient.defaults.headers.common.Authorization;

        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Login
  const login = (token, userData) => {
    if (!token) {
      console.error("Login failed: no access token.");
      return;
    }

    localStorage.setItem(TOKEN_KEY, token);

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(userData)
    );

    apiClient.defaults.headers.common.Authorization =
      `Bearer ${token}`;

    setUser(userData);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    delete apiClient.defaults.headers.common.Authorization;

    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: Boolean(user),
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}