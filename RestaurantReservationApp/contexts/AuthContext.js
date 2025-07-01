import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    { email: 'admin@example.com', password: 'admin' },
  ]);

  const login = (email, password) => {
    const existing = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existing) {
      setUser({ email: existing.email });
      return true;
    }
    return false;
  };

  const register = (email, password) => {
    if (users.some((u) => u.email === email)) return false;
    setUsers((prev) => [...prev, { email, password }]);
    setUser({ email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
