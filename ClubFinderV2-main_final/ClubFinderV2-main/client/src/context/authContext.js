import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    // Set default values here, as if the user is always logged in
    username: "mockUser", // Replace with your own mock user data
    email: "mockuser@example.com", // Replace with mock email
    // Any other user properties you need
  });

  const login = async (inputs) => {
    // This can be mocked or left out if you want to disable login entirely
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      inputs
    );

    // Store token and user info in localStorage
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    setCurrentUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null); // Set to null if you want to logout explicitly
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
