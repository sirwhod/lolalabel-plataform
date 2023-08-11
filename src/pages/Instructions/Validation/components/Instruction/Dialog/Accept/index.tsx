import { useContext, useState } from 'react'
import {
  Instruction,
  InstructionsContext,
} from '../../../../../../../context/InstructionsContext'
import {
  CloseButton,
  Content,
  Overlay,
  Title,
  ValidateInstructionContainer,
} from './styled'
import { Check, X } from 'phosphor-react'
import { LoadingButton } from '../../../../../../../components/LoadingButton'
import { Success } from '../../../../../../../components/Success'

interface AcceptInstructionProps {
  instructionData: Instruction
}

export function AcceptInstruction({ instructionData }: AcceptInstructionProps) {
  const { acceptInstruction } = useContext(InstructionsContext)
  const [waitingButton, setWaitingbutton] = useState<boolean>(false)
  const [successButton, setsuccessbutton] = useState<boolean>(false)

  async function handleAcceptInstruction() {
    setWaitingbutton(true)
    await acceptInstruction(instructionData.id).finally(() => {
      // eslint-disable-next-line no-unused-expressions
      setWaitingbutton(false)
      setsuccessbutton(true)
    })
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <Check size={32} weight="fill" />
          Validar instrução
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <ValidateInstructionContainer>
          <span>{`Validar o instrução significa que o instrução entrará em produção, e estará visivel para o cliente final.`}</span>
          <strong>{`Tem certeza que deseja validar a instrução ${instructionData.language} do produto ${instructionData.whatProduct.productName} da linha ${instructionData.whatProduct.productLine} de versão ${instructionData.whatProduct.version}?`}</strong>
          {waitingButton ? (
            <>
              <LoadingButton
                statusColor="black"
                statusHeight="complete"
                statusWidth="complete"
              />
            </>
          ) : (
            <>
              <button onClick={handleAcceptInstruction}>
                Sim, validar instrução!
              </button>
            </>
          )}
          {successButton && (
            <Success isOpen={true} message="Produto copiado com sucesso!" />
          )}
        </ValidateInstructionContainer>
      </Content>
    </div>
  )
}
