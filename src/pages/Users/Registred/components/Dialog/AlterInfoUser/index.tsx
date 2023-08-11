import { CaretDown, Check, User, Warning, X } from 'phosphor-react'
import {
  CardUser,
  CheckboxButton,
  CheckboxContainer,
  CloseButton,
  Content,
  ContentSelect,
  FormContainer,
  ItemSelect,
  Overlay,
  Title,
  TriggerSelect,
  ViewportSelect,
} from './styled'

import * as Select from '@radix-ui/react-select'
import * as Checkbox from '@radix-ui/react-checkbox'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Controller, useForm } from 'react-hook-form'

import {
  User as UserProps,
  UsersContext,
} from '../../../../../../context/UsersConstext'
import { ErrorSpan } from '../../../../../../global'
import { useContext, useState } from 'react'
import { LoadingButton } from '../../../../../../components/LoadingButton'

interface UserRegistredProps {
  userData: UserProps
}

const alterUserSchema = z.object({
  departament: z.enum([
    'Tecnologia da Informação',
    'Marketing de Produto',
    'Garantia da Qualidade',
  ]),
  permission: z.enum(['Administrador', 'MKT1', 'MKT2', 'REGCAD1', 'REGCAD2']),
  active: z.boolean(),
})

type AlterUserSchemaInputs = z.infer<typeof alterUserSchema>

export function AlterInfoUser({ userData }: UserRegistredProps) {
  const { id } = userData
  const { alterInfoUser } = useContext(UsersContext)
  const [checked, setChecked] = useState<boolean>(userData.active)

  function handleCheckCheckbox() {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AlterUserSchemaInputs>({
    resolver: zodResolver(alterUserSchema),
  })

  async function handleAlterUser(data: AlterUserSchemaInputs) {
    const newUserData = { id, ...data }
    await alterInfoUser(newUserData)
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <User size={32} weight="fill" />
          Alterar informações do usuário
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <CardUser>
          <User size={16} weight="fill" />
          <div>
            <strong>{userData.name}</strong>
            <span>{userData.departament}</span>
          </div>
        </CardUser>

        <FormContainer onSubmit={handleSubmit(handleAlterUser)}>
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
                            <Select.Label>Permissão</Select.Label>
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
            <CheckboxContainer>
              <CheckboxButton
                id="active"
                checked={checked}
                onClick={handleCheckCheckbox}
                {...register('active', { value: checked })}
              >
                <Checkbox.Indicator>
                  {checked && <Check fill="bold" />}
                </Checkbox.Indicator>
              </CheckboxButton>
              <label htmlFor="active">
                Marque para ativar o usuário dentro da plataforma
              </label>
            </CheckboxContainer>
            {errors.active && (
              <ErrorSpan>
                <Warning weight="fill" />
                {errors.active.message}
              </ErrorSpan>
            )}
          </div>

          {isSubmitting ? (
            <>
              <LoadingButton
                statusColor="black"
                statusHeight="complete"
                statusWidth="complete"
              />
            </>
          ) : (
            <>
              <button type="submit">Alterar!</button>
            </>
          )}
        </FormContainer>
      </Content>
    </div>
  )
}
