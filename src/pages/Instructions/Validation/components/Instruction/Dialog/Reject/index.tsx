import { useContext, useState } from 'react'
import {
  Instruction,
  InstructionsContext,
} from '../../../../../../../context/InstructionsContext'
import {
  CloseButton,
  Content,
  Overlay,
  RejectInstructionContainer,
  Title,
} from './styled'
import { X } from 'phosphor-react'
import { LoadingButton } from '../../../../../../../components/LoadingButton'

interface RejectInstructionProps {
  instructionData: Instruction
}

export function RejectInstruction({ instructionData }: RejectInstructionProps) {
  const { rejectInstruction } = useContext(InstructionsContext)
  const [waitingButton, setWaitingButton] = useState<boolean>(false)

  async function handleRejectInstruction() {
    setWaitingButton(true)
    await rejectInstruction(instructionData.id).finally(() =>
      setWaitingButton(false),
    )
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <X size={32} weight="fill" />
          Rejeitar instrução
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <RejectInstructionContainer>
          <span>{`Rejeitar o instrução significa que o instrução será desabilitado e não ficará visivel para o usuário nem para o cliente final. `}</span>
          <strong>{`Tem certeza que deseja rejeitar a instrução ${instructionData.language} do produto ${instructionData.whatProduct.productName} da linha ${instructionData.whatProduct.productLine} de versão ${instructionData.whatProduct.version}?`}</strong>
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
              <button onClick={handleRejectInstruction}>
                Sim, rejeitar instrução!
              </button>
            </>
          )}
        </RejectInstructionContainer>
      </Content>
    </div>
  )
}
