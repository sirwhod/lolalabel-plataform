import { QrCode, XCircle } from 'phosphor-react'
import {
  FormContainer,
  LoginContainer,
  LogoContent,
  WrongPassword,
} from './styled'

import { Navigate } from 'react-router-dom'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { LoadingButton } from '../../components/LoadingButton'

import LogoLola from '../../assets/logo-lola.png'

const loginSchema = z.object({
  username: z.string().nonempty('O campo de usuário é obrigatório!'),
  password: z
    .string()
    .nonempty('o campo de senha é obrigatório!')
    .transform((data) => {
      return btoa(data)
    }),
})

type loginForm = z.infer<typeof loginSchema>

export function Login() {
  const { authenticate, wrongPassword, userAuth } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted },
  } = useForm<loginForm>({
    resolver: zodResolver(loginSchema),
  })

  async function handleLogin(data: loginForm) {
    await authenticate(data.username, data.password)
  }

  if (isSubmitted) {
    return <Navigate to="/home" />
  }

  if (userAuth) {
    return <Navigate to="/home" />
  }

  return (
    <LoginContainer>
      <LogoContent>
        <div>
          <img src={LogoLola} alt="" />
          <h1>Plataforma rótulos</h1>
        </div>
      </LogoContent>
      <FormContainer>
        <form onSubmit={handleSubmit(handleLogin)}>
          <strong>Insira seus dados</strong>
          <input
            type="text"
            placeholder={`👤   Usuário`}
            {...register('username')}
          />
          <input
            type="password"
            placeholder="🔑   Senha"
            {...register('password')}
          />
          {wrongPassword && (
            <>
              <WrongPassword>
                <XCircle size={32} weight="fill" />
                Usuário ou senha estão Incorretos!
              </WrongPassword>
            </>
          )}
          {isSubmitting ? (
            <LoadingButton
              statusColor="black"
              statusHeight="complete"
              statusWidth="complete"
            />
          ) : (
            <button type="submit" disabled={isSubmitting}>
              Entrar
            </button>
          )}
        </form>
      </FormContainer>
    </LoginContainer>
  )
}
