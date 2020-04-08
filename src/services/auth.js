const USER_KEY = "@LinksMoney:user";

export const isAuthenticated = () => !!localStorage.getItem(USER_KEY);

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));

export const login = (user) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));

export const logout = () => localStorage.removeItem(USER_KEY);

export const expireToken = () => {
  if (getUser()?.expiration <= Date.now()) {
    logout();
  }
};
