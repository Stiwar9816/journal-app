import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password })
    }
}))

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => fn => fn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})
describe('Pruebas en <LoginPage/>', () => {

    beforeEach(() => jest.clearAllMocks())
    it('Debe de mostrar el componente correctamente', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        expect(screen.getAllByText('Iniciar sesión').length).toBeGreaterThanOrEqual(1)
    });

    it('Botón de google debe de llamar el startGoogleSignIn', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByLabelText('btn_google')
        fireEvent.click(googleBtn)
        expect(mockStartGoogleSignIn).toHaveBeenCalled()
    });

    it('submit debe de llamar el startLoginWithEmailPassword', () => {
        const email = 'carlos@test.com'
        const password = 'ABC123'

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )
        const emailField = screen.getByRole('textbox', { name: 'Correo' })
        fireEvent.change(emailField, { target: { name: 'email', value: email } })

        const passwordField = screen.getByTestId('password')
        fireEvent.change(passwordField, { target: { name: 'password', value: password } })

        const loginForm = screen.getByLabelText('submit_form')
        fireEvent.submit(loginForm)
        expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({ email, password })
    });
});
