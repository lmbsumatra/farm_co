import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Check local storage for user data on initial render
  const storedUserData = localStorage.getItem("userData");
  const initialUser = storedUserData ? JSON.parse(storedUserData) : null;

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    // Save user data to local storage whenever it changes
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      localStorage.removeItem("userData");
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
