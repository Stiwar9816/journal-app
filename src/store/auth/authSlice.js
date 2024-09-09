import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
        errorCode: null
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated'
            state.displayName = payload.displayName
            state.uid = payload.uid
            state.email = payload.email
            state.photoURL = payload.photoURL
            state.errorMessage = null
            state.errorCode = null
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'
            state.displayName = null
            state.uid = null
            state.email = null
            state.photoURL = null
            state.errorMessage = payload?.errorMessage
            state.errorCode = payload?.errorCode
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;