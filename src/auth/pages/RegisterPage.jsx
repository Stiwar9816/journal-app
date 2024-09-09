import { AuthLayout } from "../layout/AuthLayout"
import { RegisterForm } from "../components"

export const RegisterPage = () => {
  return (
    <AuthLayout title={'Registro'}>
      <RegisterForm />
    </AuthLayout>
  )
}
