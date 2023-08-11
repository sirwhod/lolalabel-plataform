import { CaretDown, Pencil, Warning } from 'phosphor-react'

import * as Select from '@radix-ui/react-select'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, useForm } from 'react-hook-form'

import {
  ButtonSubmitDiv,
  ContentSelect,
  ItemSelect,
  RegisterUserContainer,
  RegisterUserFormContainer,
  RegisterUserFormContent,
  RegisterUserFormHeader,
  TriggerSelect,
  ViewportSelect,
} from './styles'
import { ErrorSpan } from '../../../global'
import { useContext } from 'react'
import { UsersContext } from '../../../context/UsersConstext'
import { LoadingButton } from '../../../components/LoadingButton'
import { Success } from '../../../components/Success'
import { useAuth } from '../../../context/AuthProvider/useAuth'
import { Navigate } from 'react-router-dom'

const newUserSchema = z
  .object({
    name: z
      .string()
      .nonempty('O nome é obrigatório')
      .transform((name) => {
        return name
          .trim()
          .split(' ')
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1))
          })
          .join(' ')
      }),
    username: z
      .string()
      .nonempty('O e-mail é obrigatório!')
      .email('Formato de e-mail Inválido')
      .toLowerCase()
      .endsWith('@farmativa.ind.br', 'O e-mail precisa ser da farmativa'),
    departament: z.enum([
      'Tecnologia da Informação',
      'Marketing de Produto',
      'Garantia da Qualidade',
    ]),
    permission: z.enum(['Administrador', 'MKT1', 'MKT2', 'REGCAD1', 'REGCAD2']),
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

type NewUserSchemaInputs = z.infer<typeof newUserSchema>

export function RegisterUser() {
  const { createNewUser } = useContext(UsersContext)
  const { userAuth } = useAuth()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<NewUserSchemaInputs>({
    resolver: zodResolver(newUserSchema),
  })

  if (userAuth?.user?.permission !== 'Administrador') {
    return <Navigate to="/home" />
  }

  async function handleCreateNewUser(data: NewUserSchemaInputs) {
    const { confirmPassword, ...formData } = data
    await createNewUser(formData)
    reset()
  }

  return (
    <RegisterUserContainer>
      <RegisterUserFormContainer onSubmit={handleSubmit(handleCreateNewUser)}>
        <RegisterUserFormHeader>
          <Pencil size={32} weight="fill" />
          <h1>Cadastro do usuário</h1>
        </RegisterUserFormHeader>

        <RegisterUserFormContent>
          <div>
            <label htmlFor="inputName">Nome</label>
            <input
              type="text"
              id="inputName"
              placeholder="Digite o nome do usuário"
              {...register('name')}
            />
            {errors.name && (
              <ErrorSpan>
                <Warning size={16} weight="fill" />
                {errors.name.message}
              </ErrorSpan>
            )}
          </div>

          <div>
            <label htmlFor="inputEmail">E-mail</label>
            <input
              type="text"
              id="inputEmail"
              placeholder="Digite o e-mail do usuário"
              {...register('username')}
            />
            {errors.username && (
              <ErrorSpan>
                <Warning size={16} weight="fill" />
                {errors.username.message}
              </ErrorSpan>
            )}
          </div>

          <div>
            <label htmlFor="departament">Setor do usuário</label>
            <Controller
              control={control}
              name="departament"
              render={({ field }) => {
                return (
                  <Select.Root
                    onValueChange={(
                      event:
                        | 'Tecnologia da Informação'
                        | 'Marketing de Produto'
                        | 'Garantia da Qualidade',
                    ) => field.onChange(event)}
                    value={field.value}
                  >
                    <TriggerSelect id="departament">
                      <Select.Value placeholder="Selecione o setor do usuário" />
                      <Select.Icon>
                        <CaretDown size={16} weight="bold" />
                      </Select.Icon>
                    </TriggerSelect>

                    <Select.Portal>
                      <ContentSelect position="popper" sideOffset={5}>
                        <Select.ScrollUpButton />
                        <ViewportSelect>
                          <Select.Group>
                            <Select.Label>Setores</Select.Label>
                            <ItemSelect value="Tecnologia da Informação">
                              <Select.ItemText>
                                Tecnologia da Informação
                              </Select.ItemText>
                              <Select.ItemIndicator />
                            </ItemSelect>
                            <ItemSelect value="Marketing de Produto">
                              <Select.ItemText>
                                Marketing de Produto
                              </Select.ItemText>
                              <Select.ItemIndicator />
                            </ItemSelect>

                            <ItemSelect value="Garantia da Qualidade">
                              <Select.ItemText>
                                Garantia da Qualidade
                              </Select.ItemText>
                              <Select.ItemIndicator />
                            </ItemSelect>
                          </Select.Group>

                          <Select.Separator />
                        </ViewportSelect>
                        <Select.ScrollDownButton />
                        <Select.Arrow />
                      </ContentSelect>
                    </Select.Portal>
                  </Select.Root>
                )
              }}
            />
            {errors.departament && (
              <ErrorSpan>
                <Warning size={16} weight="fill" />
                Selecione o setor do usuário
              </ErrorSpan>
            )}
          </div>

          <div>
            <label htmlFor="permission">Perfil do usuário</label>
            <Controller
              control={control}
              name="permission"
              render={({ field }) => {
                return (
                  <Select.Root
                    onValueChange={(
                      event:
                        | 'Administrador'
                        | 'MKT1'
                        | 'MKT2'
                        | 'REGCAD1'
                        | 'REGCAD2',
                    ) => field.onChange(event)}
                    value={field.value}
                  >
                    <TriggerSelect id="permission">
                      <Select.Value placeholder="Selecione o perfil do usuário" />
                      <Select.Icon>
                        <CaretDown size={16} weight="bold" />
                      </Select.Icon>
                    </TriggerSelect>

                    <Select.Portal>
                      <ContentSelect position="popper" sideOffset={5}>
                        <Select.ScrollUpButton />
                        <ViewportSelect>
                          <Select.Group>
                            <Select.Label>Setores</Select.Label>
                            <ItemSelect value="Administrador">
                              <Select.ItemText>Administrador</Select.ItemText>
                              <Select.ItemIndicator />
                            </ItemSelect>

                            <ItemSelect value="MKT1">
                              <Select.ItemText>MKT1</Select.ItemText>
                              <Select.ItemIndicator />
                            </ItemSelect>

                            <ItemSelect value="MKT2">
                              <Select.ItemText>MKT2</Select.ItemText>
                              <Select.ItemIndicator />
                            </ItemSelect>

                            <ItemSelect value="REGCAD1">
                              <Select.ItemText>REGCAD1</Select.ItemText>
                              <Select.ItemIndicator />
                            </ItemSelect>

                            <ItemSelect value="REGCAD2">
                              <Select.ItemText>REGCAD2</Select.ItemText>
                              <Select.ItemIndicator />
                            </ItemSelect>
                          </Select.Group>

                          <Select.Separator />
                        </ViewportSelect>
                        <Select.ScrollDownButton />
                        <Select.Arrow />
                      </ContentSelect>
                    </Select.Portal>
                  </Select.Root>
                )
              }}
            />
            {errors.permission && (
              <ErrorSpan>
                <Warning size={16} weight="fill" />
                Selecione o Perfil do usuário
              </ErrorSpan>
            )}
          </div>

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
        </RegisterUserFormContent>

        <ButtonSubmitDiv>
          <span>
            Ao cadastrar um novo usuário, o mesmo deve ser ativado na página de
            usuários cadastrados!
          </span>
          {isSubmitting ? (
            <LoadingButton
              statusColor="black"
              statusHeight="complete"
              statusWidth="complete"
            />
          ) : (
            <button type="submit">Criar</button>
          )}
          {isSubmitted && (
            <Success isOpen={true} message="Usuário cadastrado com sucesso!" />
          )}
        </ButtonSubmitDiv>
      </RegisterUserFormContainer>
    </RegisterUserContainer>
  )
}
