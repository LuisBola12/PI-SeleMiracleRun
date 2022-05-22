export const userReducers = {
  logout: (state) => {
    state.user = null;
    state.userIsLoggedIn = false;
    state.errorMessage = "";
  },
};