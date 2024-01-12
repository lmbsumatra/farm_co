import { useState, createContext, useContext, useEffect } from "react";

// User Authentication Context
const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const storedUserData = localStorage.getItem("userData");
  const initialUser = storedUserData ? JSON.parse(storedUserData) : null;

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
  
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
    console.log("back", user)
  };

  const deleteUser = () => {
    logout();
  };

  return (
    <UserAuthContext.Provider value={{ user, login, logout, deleteUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};

// Admin Authentication Context
const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const storedAdminData = localStorage.getItem("adminData");
  const initialAdmin = storedAdminData ? JSON.parse(storedAdminData) : null;

  const [admin, setAdmin] = useState(initialAdmin);

  useEffect(() => {
    if (admin) {
      localStorage.setItem("adminData", JSON.stringify(admin));
    } else {
      localStorage.removeItem("adminData");
    }
  }, [admin]);

  const loginAdmin = (adminData) => {
    setAdmin(adminData);
  };

  const logoutAdmin = () => {
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};
