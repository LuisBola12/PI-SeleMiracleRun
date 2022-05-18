export const userReducers = {
    logout: (state) => {
        state.user = null;
        state.isLoggedIn = false;
    },
};