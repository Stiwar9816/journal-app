import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {
    it('Debe de regresar el estado inicial y llamarse el "Auth" ', () => {
        expect(authSlice.name).toBe('auth')
        const state = authSlice.reducer(initialState, {})
        expect(state).toEqual(initialState)
    });

    it('Debe realizar la autenticación', () => {
        const state = authSlice.reducer(initialState, login(demoUser))
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
            errorCode: null
        })
    });

    it('Debe realizar el logout sin argumentos', () => {
        const state = authSlice.reducer(authenticatedState, logout())
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
            errorCode: undefined
        });
    });

    it('Debe realizar el logout con argumentos', () => {
        const errorMessage = 'Credenciales son incorrectas'
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }))
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage,
            errorCode: undefined
        });
    });

    it('Debe cambiar el estado a checking', () => {
        const state = authSlice.reducer(authenticatedState, checkingCredentials())
        expect(state.status).toBe('checking');
    });
})