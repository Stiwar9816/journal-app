import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { firebaseAuth } from "./config"

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider)
        const { displayName, email, photoURL, uid } = result.user
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.customData._tokenResponse.error.code
        const errorMessage = error.code
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
    try {
        const res = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        const { uid, photoURL } = res.user
        await updateProfile(firebaseAuth.currentUser, { displayName })
        return {
            ok: true,
            email, password, displayName, uid, photoURL
        }
    } catch (error) {
        const errorCode = error.customData._tokenResponse.error.code
        const errorMessage = error.code
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const singInWithEmailPassword = async ({ email, password }) => {
    try {
        const res = await signInWithEmailAndPassword(firebaseAuth, email, password)
        const { displayName, uid, photoURL } = res.user
        return {
            ok: true,
            displayName,
            uid,
            photoURL
        }
    } catch (error) {
        const errorMessage = error.code
        return {
            ok: false,
            errorMessage
        }
    }
}

export const logoutFirebase = async () => await firebaseAuth.signOut()