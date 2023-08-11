import {
  CardUser,
  CloseButton,
  Content,
  FormPasswordUser,
  Overlay,
  Title,
} from './styled'
import { Key, User, Warning, X } from 'phosphor-react'

import { User as UserProps, UsersContext } from '../../context/UsersConstext'
import { useAuth } from '../../context/AuthProvider/useAuth'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, useForm } from 'react-hook-form'
import { ErrorSpan } from '../../global'
import { LoadingButton } from '../LoadingButton'
import { useContext } from 'react'

interface AlterPasswordProps {
  page: 'Header' | 'UsersRegistred'
  userData?: UserProps
}
const alterUserPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'precisa ter pelo menos 8 caracteres')
      .nonempty('A senha é obrigatória, precisa ter 8 caracteres')
      .transform((data) => {
        return btoa(data)
      }),
    confirmPassword: z
      .string()
      .min(8, 'precisa ter pelo menos 8 caracteres')
      .nonempty('A senha é obrigatória, precisa ter 8 caracteres')
      .transform((data) => {
        return btoa(data)
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type alterUserPasswordSchemaForm = z.infer<typeof alterUserPasswordSchema>

export function AlterPassword({ page, userData }: AlterPasswordProps) {
  const { userAuth } = useAuth()
  const { alterMyPassword, alterPassword } = useContext(UsersContext)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<alterUserPasswordSchemaForm>({
    resolver: zodResolver(alterUserPasswordSchema),
  })

  async function handleSubmitAlterMyPassword(
    data: alterUserPasswordSchemaForm,
  ) {
    const newPassword = {
      password: data.confirmPassword,
    }

    await alterMyPassword(newPassword)
  }

  async function handleSubmitAlterPassword(data: alterUserPasswordSchemaForm) {
    const { confirmPassword } = data
    let id = ''
    if (userData) {
      id = userData.id
    }

    const newPassword = {
      id,
      password: confirmPassword,
    }
    await alterPassword(newPassword)
  }

  if (userAuth) {
    if (page === 'Header') {
      return (
        <div>
          <Overlay />
          <Content>
            <Title>
              <Key size={32} weight="fill" />
              Alterar Senha
            </Title>

            <CloseButton asChild>
              <X size={16} weight="bold" />
            </CloseButton>

            <CardUser>
              <User size={16} weight="fill" />
              <div>
                <strong>{userAuth.user?.name}</strong>
                <span>{userAuth.user?.departament}</span>
              </div>
            </CardUser>

            <FormPasswordUser
              onSubmit={handleSubmit(handleSubmitAlterMyPassword)}
            >
              <div>
                <label htmlFor="inputPassword">Senha</label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <input
                      type="password"
                      id="inputPassword"
                      placeholder="Digite a senha do usuário"
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <ErrorSpan>
                    <Warning size={16} weight="fill" />
                    {errors.password.message}
                  </ErrorSpan>
                )}
              </div>

              <div>
                <label htmlFor="inputConfirmPassword">Confirme a senha</label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <input
                      type="password"
                      id="inputConfirmPassword"
                      placeholder="Confirme a senha do usuário"
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <ErrorSpan>
                    <Warning size={16} weight="fill" />
                    {errors.confirmPassword.message}
                  </ErrorSpan>
                )}
              </div>

              {isSubmitting ? (
                <LoadingButton
                  statusColor="black"
                  statusHeight="complete"
                  statusWidth="complete"
                />
              ) : (
                <button type="submit">Alterar!</button>
              )}
            </FormPasswordUser>
          </Content>
        </div>
      )
    } else if (page === 'UsersRegistred') {
      return (
        <div>
          <Overlay />
          <Content>
            <Title>
              <Key size={32} weight="fill" />
              Alterar Senha
            </Title>

            <CloseButton asChild>
              <X size={16} weight="bold" />
            </CloseButton>

            <CardUser>
              <User size={16} weight="fill" />
              <div>
                <strong>{userData?.name}</strong>
                <span>{userData?.departament}</span>
              </div>
            </CardUser>

            <FormPasswordUser
              onSubmit={handleSubmit(handleSubmitAlterPassword)}
            >
              <div>
                <label htmlFor="inputPassword">Senha</label>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <input
                      type="password"
                      id="inputPassword"
                      placeholder="Digite a senha do usuário"
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <ErrorSpan>
                    <Warning size={16} weight="fill" />
                    {errors.password.message}
                  </ErrorSpan>
                )}
              </div>

              <div>
                <label htmlFor="inputConfirmPassword">Confirme a senha</label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <input
                      type="password"
                      id="inputConfirmPassword"
                      placeholder="Confirme a senha do usuário"
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <ErrorSpan>
                    <Warning size={16} weight="fill" />
                    {errors.confirmPassword.message}
                  </ErrorSpan>
                )}
              </div>

              {isSubmitting ? (
                <LoadingButton
                  statusColor="black"
                  statusHeight="complete"
                  statusWidth="complete"
                />
              ) : (
                <button type="submit">Alterar!</button>
              )}
            </FormPasswordUser>
          </Content>
        </div>
      )
    } else {
      return null
    }
  } else {
    return null
  }
}
