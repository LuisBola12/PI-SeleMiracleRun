import { createAsyncThunk } from "@reduxjs/toolkit";

// export const postLogin = createAsyncThunk('usuarios/postLogin', async (credentials) => {
//     const loginFetch = await fetch('https://api.ticolitas.com/usuarios/login', 
//     {
//         method: 'POST',
//         headers: {
//             "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//             email: credentials.username,
//             password: credentials.password,
//         }),
//     });

//     const userData = await loginFetch.json();

//     return getData(userData, loginFetch);

// });

export const postLogin = createAsyncThunk('usuarios/postLogin', async (credentials) => {
    const loginFetch = await fetch('http://localhost:4000/users', 
    {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            Email: credentials.username,
            Contrasenia: credentials.password,
        }),
    });

    const userData = await loginFetch.json();

    return getData(userData, loginFetch);

});

const getData = (userData, loginFetch) => {

    if (loginFetch.status === 200) {
        console.log(userData.errorMsg);
        return userData;
    } else {
        return {
            error: true,
            message: userData.errorMsg,
        }
    }
}

export const onPostLoginFullfilled = (state, action) => {
    if (action.payload.error) {
        state.userIsLoggedIn = false;
        state.user = null;
        state.errorMessage = action.payload.message;
    } else {
        state.userIsLoggedIn = true;
        state.user = action.payload;
    }
};

export const onPostLoginRejected = (state) => {
    state.userIsLoggedIn = false;
    state.user = null;
};