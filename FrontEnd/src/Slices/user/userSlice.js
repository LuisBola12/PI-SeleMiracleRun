import { onPostLoginFullfilled, onPostLoginRejected, postLogin } from "./requests/postLogin";
import { createSlice } from "@reduxjs/toolkit";
import { userReducers } from "./reducers/reducers";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userIsLoggedIn: false,
        errorMessage: "",
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            state.userIsLoggedIn = false;
            state.errorMessage = "";
        }
    },

    extraReducers(builder) {
        builder
            .addCase(postLogin.fulfilled, onPostLoginFullfilled)
            .addCase(postLogin.rejected, onPostLoginRejected)
    }
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;