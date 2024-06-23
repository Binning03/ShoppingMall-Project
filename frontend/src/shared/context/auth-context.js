import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  switchAdmin: () => {},
  login: () => {},
  logout: () => {}
});
