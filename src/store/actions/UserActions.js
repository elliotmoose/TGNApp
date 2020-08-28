export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';

export const SetLoggedInUser = (user, token) => ({
  type: SET_LOGGED_IN_USER,
  user,
  token
})