import { logoutFirebase, signInWithGoogle, singInWithEmailPassword } from "../../../src/firebase/provider";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";
import { clearNotesLogout } from "../../../src/store/journal";

jest.mock('../../../src/firebase/provider')
describe('Pruebas en AuthThunks', () => {
    const dispatch = jest.fn()
    beforeEach(() => jest.clearAllMocks())
    it('Debe invocar el checkinCredentials', async () => {
        await checkingAuthentication()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    });

    it('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async () => {
        const loginData = { ok: true, ...demoUser }
        await signInWithGoogle.mockResolvedValue(loginData)
        //thunks
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    });

    it('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
        const loginData = { ok: false, errorMessage: 'Credenciales incorrectas' }
        await signInWithGoogle.mockResolvedValue(loginData)
        //thunks
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
    });

    it('startLoginWithEmailPassword debe de llamar checkingCredentials y singInWithEmailPassword - Exito', async () => {
        const loginData = { ok: true, ...demoUser }
        const formData = { email: demoUser.email, password: '123456' }
        await singInWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    });

    it('startLoginWithEmailPassword debe de llamar checkingCredentials y singInWithEmailPassword - Error', async () => {
        const loginData = { ok: false, errorMessage: 'Credenciales incorrectas' }
        const formData = { email: demoUser.email, password: '123456' }
        await singInWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData)(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
    });

    it('startLogout Debe de llamar logoutFirebase, clearNotes y logout', async () => {
        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())
    });


});
