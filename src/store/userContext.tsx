'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';
import { User } from '@/interfaces/user';

interface UserContextProps {
  uid: string | null;
  isLogged: boolean;
  userEmail: string | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (
    uid: string | null,
    userEmail: string | null,
    isLogged: boolean
  ) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '{}') as Record<
      string,
      User
    >;
    const lastLoggedInUser = Object.values(users).find((user) => user.isLogged);

    if (lastLoggedInUser) {
      setUid(lastLoggedInUser.uid);
      setUserEmail(lastLoggedInUser.email);
      setIsLogged(lastLoggedInUser.isLogged);
    }
  }, []);

  const setUser = (
    uid: string | null,
    userEmail: string | null,
    isLogged: boolean
  ) => {
    setUid(uid);
    setUserEmail(userEmail);
    setIsLogged(isLogged);
  };

  return (
    <UserContext.Provider value={{ uid, isLogged, userEmail, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
