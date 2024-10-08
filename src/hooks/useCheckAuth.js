import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { onAuthStateChanged } from "firebase/auth"
import { login, logout, startLoadingNotes } from "../store"
import { firebaseAuth } from "../firebase"

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (async (user) => {
            if (!user) return dispatch(logout())
            const { uid, email, displayName, photoURL } = user
            dispatch(login({ uid, email, displayName, photoURL }))
            dispatch(startLoadingNotes())
        }))
    }, [])

    return { status }
}
