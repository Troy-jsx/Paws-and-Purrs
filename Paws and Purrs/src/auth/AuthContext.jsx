import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function readUser() {
  try {
    return JSON.parse(sessionStorage.getItem("user")) ?? null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);

  function login(token, newUser) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  }

  function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}