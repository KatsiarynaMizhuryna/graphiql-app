import { User, UserRequest } from '@/interfaces/user';
import toast from 'react-hot-toast';

export const saveUserToLocalStorage = (uid: string, email: string) => {
  const users = JSON.parse(localStorage.getItem('users') || '{}');

  users[uid] = {
    uid,
    isLogged: true,
    email,
    history: []
  };

  localStorage.setItem('users', JSON.stringify(users));
};

export const checkedLocalStorage = (uid: string, email: string) => {
  const users = JSON.parse(localStorage.getItem('users') || '{}') as Record<
    string,
    User
  >;
  const lastLoggedInUser =
    Object.values(users).find((user) => user.uid === uid) || null;
  if (!lastLoggedInUser) {
    saveUserToLocalStorage(uid, email);
  }
};

export const logOutUserToLocalStorage = (uid: string) => {
  const users = JSON.parse(localStorage.getItem('users') || '{}') as Record<
    string,
    User
  >;
  if (users[uid]) {
    users[uid].isLogged = false;
    localStorage.setItem('users', JSON.stringify(users));
  } else {
    toast.error('User with id not found');
  }
};

export const saveRequestToUserHistory = (
  uid: string,
  newRequest: UserRequest
) => {
  const users = JSON.parse(localStorage.getItem('users') || '{}') as Record<
    string,
    User
  >;
  if (users[uid]) {
    const user = users[uid];
    user.history = [...(user.history || []), newRequest];

    users[uid] = user;
    localStorage.setItem('users', JSON.stringify(users));
  } else {
    toast.error('User not found in localStorage');
  }
};
