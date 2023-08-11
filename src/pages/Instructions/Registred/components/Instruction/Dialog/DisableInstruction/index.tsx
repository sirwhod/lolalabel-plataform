import { CloseButton, Content, DisableForm, Overlay, Title } from './styled'
import { EyeSlash, Warning, X } from 'phosphor-react'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { InstructionsContext } from '../../../../../../../context/InstructionsContext'
import { ErrorSpan } from '../../../../../../../global'
import { LoadingButton } from '../../../../../../../components/LoadingButton'
import { Success } from '../../../../../../../components/Success'

interface DisableInstructionProps {
  instructionDataId: string
}

const disableInstructionSchema = z.object({
  reason: z.string().nonempty('Insira o motivo da desativação do Produto!'),
})

type disableInstructionFormInputs = z.infer<typeof disableInstructionSchema>

export function DisableInstruction({
  instructionDataId,
}: DisableInstructionProps) {
  const { disableInstruction } = useContext(InstructionsContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<disableInstructionFormInputs>({
    resolver: zodResolver(disableInstructionSchema),
  })

  async function handleDisableInstruction(data: disableInstructionFormInputs) {
    await disableInstruction(instructionDataId, data.reason)
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <EyeSlash size={32} weight="fill" />
          Desabilitar instrução
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <DisableForm onSubmit={handleSubmit(handleDisableInstruction)}>
          <span>
            Desativar a instrução fará com que ela não esteja mais visível para
            o consumidor final, o usuário poderá reativar o produto clicando em
            reativar na página Histórico de instruções.
          </span>
          <div>
            <label htmlFor="reason">Motivo</label>
            <textarea
              id="reason"
              placeholder="Digite aqui o motivo da desativação..."
              {...register('reason')}
              required
            />
            {errors.reason && (
              <ErrorSpan>
                <Warning size={16} weight="fill" />
                {errors.reason.message}
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
            <button type="submit">Sim, Desativar instrução!</button>
          )}
          {isSubmitted && (
            <Success isOpen={true} message="Produto copiado com sucesso!" />
          )}
        </DisableForm>
      </Content>
    </div>
  )
}
