import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("event_user") || "null"),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("event_token");
    if (!token) return setLoading(false);
    api
      .get("/auth/me")
      .then(({ data }) => setUser(data.user))
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  const login = async (values) => {
    const { data } = await api.post("/auth/login", values);
    localStorage.setItem("event_token", data.token);
    localStorage.setItem("event_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (values) => {
    const { data } = await api.post("/auth/register", values);
    localStorage.setItem("event_token", data.token);
    localStorage.setItem("event_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  function logout() {
    localStorage.removeItem("event_token");
    localStorage.removeItem("event_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
