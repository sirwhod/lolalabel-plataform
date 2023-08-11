import {
  ButtonSubmitDiv,
  ContentContainer,
  ContentSelect,
  FormNewInstruction,
  ItemSelect,
  ItemText,
  MarkDownContent,
  Message,
  TriggerSelect,
  ViewportSelect,
} from './styled'
import { CaretDown, Warning } from 'phosphor-react'

import * as Select from '@radix-ui/react-select'

import MDEditor, { commands } from '@uiw/react-md-editor'
import { CardProduct } from '../CardProduct'
import { Product as ProductProps } from '../../context/ProductContext'

import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { InstructionsContext } from '../../context/InstructionsContext'
import { LoadingButton } from '../LoadingButton'
import { Success } from '../Success'

import { US, BR, ES, DE, RU, FR } from 'country-flag-icons/react/3x2'
import { ErrorSpan } from '../../global'

const registerInstructionSchema = z.object({
  language: z.enum([
    'Português',
    'Inglês',
    'Espanhol',
    'Alemão',
    'Russo',
    'Francês',
  ]),
  Precaution: z
    .string()
    .nonempty('Você precisa preencher com o conteúdo de Precaução!'),
  modeOfUse: z
    .string()
    .nonempty('Você precisa preencher com o conteúdo do modo de uso!'),
  whatIAm: z
    .string()
    .nonempty('Você precisa preencher com o conteúdo do O que sou?'),
})

type registerInstructionFormInputs = z.infer<typeof registerInstructionSchema>

interface NewInstructionsProps {
  productData: ProductProps
  page: 'Registred' | 'Validation'
}

export function NewInstruction({ productData, page }: NewInstructionsProps) {
  const { createNewInstruction } = useContext(InstructionsContext)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset,
  } = useForm<registerInstructionFormInputs>({
    resolver: zodResolver(registerInstructionSchema),
  })

  async function handleSubmitForm(data: registerInstructionFormInputs) {
    await createNewInstruction(data, productData.id, page)
  }

  if (isSubmitSuccessful) {
    reset()
  }

  return (
    <FormNewInstruction onSubmit={handleSubmit(handleSubmitForm)}>
      <div>
        <div>
          <CardProduct productData={productData} />
          <Message>{`Ao criar uma nova instrução, a mesma deve ser validada por um usuário validador! Caso a instrução tenha uma linguagem já ativa, a linguagem atual deve ser desabilitada para habilitar a nova!`}</Message>
        </div>
        <ContentContainer>
          <Controller
            control={control}
            name="language"
            render={({ field }) => {
              return (
                <Select.Root
                  onValueChange={(
                    event:
                      | 'Português'
                      | 'Inglês'
                      | 'Espanhol'
                      | 'Alemão'
                      | 'Russo'
                      | 'Francês',
                  ) => {
                    field.onChange(event)
                  }}
                  value={field.value}
                >
                  <TriggerSelect>
                    <Select.Value placeholder="Selecione o idioma" />
                    <Select.Icon>
                      <CaretDown size={16} weight="bold" />
                    </Select.Icon>
                  </TriggerSelect>

                  <Select.Portal>
                    <ContentSelect position="popper" sideOffset={5}>
                      <Select.ScrollUpButton />
                      <ViewportSelect>
                        <Select.Group>
                          <Select.Label>Idiomas</Select.Label>
                          <ItemSelect value="Português">
                            <ItemText>
                              <BR />
                              Português
                            </ItemText>
                            <Select.ItemIndicator />
                          </ItemSelect>
                          <ItemSelect value="Inglês">
                            <ItemText>
                              <US />
                              Inglês
                            </ItemText>
                            <Select.ItemIndicator />
                          </ItemSelect>
                          <ItemSelect value="Espanhol">
                            <ItemText>
                              <ES />
                              Espanhol
                            </ItemText>
                            <Select.ItemIndicator />
                          </ItemSelect>
                          <ItemSelect value="Alemão">
                            <ItemText>
                              <DE />
                              Alemão
                            </ItemText>
                            <Select.ItemIndicator />
                          </ItemSelect>
                          <ItemSelect value="Russo">
                            <ItemText>
                              <RU />
                              Russo
                            </ItemText>
                            <Select.ItemIndicator />
                          </ItemSelect>
                          <ItemSelect value="Francês">
                            <ItemText>
                              <FR />
                              Francês
                            </ItemText>
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

          {errors.language && (
            <ErrorSpan>
              <Warning size={16} weight="fill" />É preciso selecionar ao menos
              uma linguagem!
            </ErrorSpan>
          )}

          <MarkDownContent>
            <div data-color-mode="light">
              <label htmlFor="whatIAm">O que sou?</label>
              <Controller
                control={control}
                name="whatIAm"
                render={({ field }) => {
                  return (
                    <MDEditor
                      height={200}
                      commands={[...commands.getCommands()]}
                      value={field.value}
                      onChange={(event: string) => field.onChange(event)}
                      id="whatIAm"
                    />
                  )
                }}
              />
              {errors.whatIAm && (
                <ErrorSpan>
                  <Warning size={16} weight="fill" />
                  Você precisa preencher com o conteúdo do O que sou!
                </ErrorSpan>
              )}
            </div>
            <div data-color-mode="light">
              <label htmlFor="modeOfUse">Modo de uso</label>
              <Controller
                control={control}
                name="modeOfUse"
                render={({ field }) => {
                  return (
                    <MDEditor
                      height={200}
                      commands={[...commands.getCommands()]}
                      value={field.value}
                      onChange={(event: string) => field.onChange(event)}
                      id="modeOfUse"
                    />
                  )
                }}
              />
              {errors.modeOfUse && (
                <ErrorSpan>
                  <Warning size={16} weight="fill" />
                  Você precisa preencher com o conteúdo do Modo de Uso!
                </ErrorSpan>
              )}
            </div>
            <div data-color-mode="light">
              <label htmlFor="Precaution">Precaução</label>
              <Controller
                control={control}
                name="Precaution"
                render={({ field }) => {
                  return (
                    <MDEditor
                      height={200}
                      commands={[...commands.getCommands()]}
                      value={field.value}
                      onChange={(event: string) => field.onChange(event)}
                      id="Precaution"
                    />
                  )
                }}
              />
              {errors.Precaution && (
                <ErrorSpan>
                  <Warning size={16} weight="fill" />
                  Você precisa preencher com o conteúdo de Precaução!
                </ErrorSpan>
              )}
            </div>
          </MarkDownContent>
        </ContentContainer>
      </div>
      <ButtonSubmitDiv>
        <span></span>
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
            <button type="submit" disabled={isSubmitting}>
              Criar
            </button>
          </>
        )}

        {isSubmitSuccessful && (
          <Success isOpen={true} message="Instrução cadastrada com sucesso!" />
        )}
      </ButtonSubmitDiv>
    </FormNewInstruction>
  )
}
