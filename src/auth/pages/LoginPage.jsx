import { AuthLayout } from "../layout/AuthLayout"
import { LoginForm } from '../components'
export const LoginPage = () => {
  return (
    <AuthLayout title={'Iniciar Sesión'}>
      <LoginForm />
    </AuthLayout>
  )
}
