import { logoutFirebase, registerUserWithEmailPassword, signInWithGoogle, singInWithEmailPassword } from "../../firebase"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./"

export const checkingAuthentication = (email, password) => {
    return async dispatch => dispatch(checkingCredentials())
}

export const startGoogleSignIn = () => {
    return async dispatch => {
        dispatch(checkingCredentials())
        const result = await signInWithGoogle()
        if (!result.ok) return dispatch(logout(result.errorMessage, result.errorCode))
        delete result.ok
        dispatch(login(result))
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async dispatch => {
        dispatch(checkingCredentials())
        const { ok, uid, photoURL, errorMessage, errorCode } = await registerUserWithEmailPassword({ email, password, displayName })
        if (!ok) return dispatch(logout({ errorMessage, errorCode }))
        dispatch(login({ uid, displayName, email, photoURL }))
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async dispatch => {
        dispatch(checkingCredentials())
        const res = await singInWithEmailPassword({ email, password })
        if (!res.ok) return dispatch(logout(res.errorMessage))
        dispatch(login(res))
    }
}

export const startLogout = () => {
    return async dispatch => {
        await logoutFirebase()
        dispatch(clearNotesLogout())
        dispatch(logout())
    }
}