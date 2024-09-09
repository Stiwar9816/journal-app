import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid2, Link, TextField } from "@mui/material"
import { useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener el @'],
    password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterForm = () => {
    const dispatch = useDispatch()
    const { status, errorMessage, errorCode } = useSelector(state => state.auth)
    const [formSubmitted, setFormSubmitted] = useState(false);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])
    const {
        displayName,
        email,
        password,
        onInputChange,
        formState,
        isFormValid,
        displayNameValid,
        emailValid,
        passwordValid
    } = useForm(formData, formValidations)

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true)
        if (!isFormValid) return
        dispatch(startCreatingUserWithEmailPassword(formState))
    }

    return (
        <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid2 container>
                {/* TextFields */}
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        label='Nombre completo'
                        type="text"
                        placeholder="Jhon Doe"
                        fullWidth
                        autoComplete="true"
                        sx={{ my: 2 }}
                        name='displayName'
                        value={displayName}
                        onChange={onInputChange}
                        error={!!displayNameValid && formSubmitted}
                        helperText={displayNameValid}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <TextField
                        label='Correo'
                        type="email"
                        placeholder="correo@gmail.com"
                        fullWidth
                        autoComplete="true"
                        sx={{ my: 2 }}
                        name='email'
                        value={email}
                        onChange={onInputChange}
                        error={!!emailValid && formSubmitted}
                        helperText={emailValid}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12 }} >
                    <TextField
                        label='Contraseña'
                        type="password"
                        placeholder="***********"
                        fullWidth
                        autoComplete="true"
                        sx={{ my: 2 }}
                        name='password'
                        value={password}
                        onChange={onInputChange}
                        error={!!passwordValid && formSubmitted}
                        helperText={passwordValid}
                    />
                </Grid2>
            </Grid2>
            {/* Buttons */}
            <Grid2 container spacing={2} sx={{ my: 2 }}>
                <Grid2 size={{ xs: 12 }} display={!!errorMessage ? '' : 'none'}>
                    <Alert severity='error'> {errorCode} - {errorMessage} </Alert>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <Button disabled={isCheckingAuthentication} type='submit' variant="contained" fullWidth>
                        Crear cuenta
                    </Button>
                </Grid2>

            </Grid2>
            {/* Register */}
            <Grid2 container direction={"row"} justifyContent={"center"}>
                <Link component={RouterLink} color="secondary" to='/auth/login'>
                    Ya tienes una cuenta? - Inicia sesión
                </Link>
            </Grid2>
        </form>
    )
}
