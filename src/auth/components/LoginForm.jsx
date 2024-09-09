import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid2, Link, TextField } from "@mui/material"
import { Google } from "@mui/icons-material"
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

const formData = {
    email: '',
    password: ''
}
export const LoginForm = () => {
    const dispatch = useDispatch()
    const { status, errorMessage } = useSelector(state => state.auth)

    const { email, password, onInputChange } = useForm(formData)

    const isAuthenticated = useMemo(() => status === 'checking', [status])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(startLoginWithEmailPassword({ email, password }))
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn())
    }

    return (
        <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid2 container>
                {/* TextFields */}
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
                    />
                </Grid2>
            </Grid2>
            {/* Buttons */}
            <Grid2 container spacing={2} sx={{ my: 2 }}>
                <Grid2 size={{ xs: 12 }} display={!!errorMessage ? '' : 'none'}>
                    <Alert severity='error'> {errorMessage} </Alert>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Button disabled={isAuthenticated} variant="contained" fullWidth type='submit'>
                        Iniciar sesión
                    </Button>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <Button disabled={isAuthenticated} variant="contained" fullWidth onClick={onGoogleSignIn}>
                        <Google sx={{ mr: 1 }} />
                        Google
                    </Button>
                </Grid2>
            </Grid2>
            {/* Register */}
            <Grid2 container direction={"row"} justifyContent={"center"}>
                <Link component={RouterLink} color="secondary" to='/auth/register'>
                    Crear una cuenta
                </Link>
            </Grid2>
        </form>
    )
}
