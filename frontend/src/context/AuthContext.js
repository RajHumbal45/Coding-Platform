import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.user || null);
      } catch {
        setUser(null);
      } finally {
        setIsReady(true);
      }
    };

    init();
  }, []);

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    setUser(response.user || null);
    return response.user;
  };

  const register = async (name, email, password) => {
    const response = await registerUser({ name, email, password });
    setUser(response.user || null);
    return response.user;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  const refreshSession = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.user || null);
      return response.user;
    } catch {
      setUser(null);
      return null;
    }
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === "admin",
      isReady,
      login,
      register,
      logout,
      refreshSession,
    }),
    [user, isReady]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
