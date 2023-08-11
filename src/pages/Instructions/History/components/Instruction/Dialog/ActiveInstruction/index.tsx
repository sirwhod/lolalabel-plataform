import { useContext } from 'react'
import {
  Instruction,
  InstructionsContext,
} from '../../../../../../../context/InstructionsContext'
import {
  ActiveInstructionContainer,
  CloseButton,
  Content,
  Overlay,
  Title,
} from './styled'
import { Eye, X } from 'phosphor-react'

interface ActiveInstructionProps {
  instructionData: Instruction
}

export function ActiveInstruction({ instructionData }: ActiveInstructionProps) {
  const { restoreInstruction } = useContext(InstructionsContext)

  async function handleRestoreFunction() {
    await restoreInstruction(instructionData.id)
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <Eye size={32} weight="fill" />
          Reativar instrução
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <ActiveInstructionContainer>
          <span>
            {`Tem certeza que deseja reativar a instrução de lingua ${instructionData.language} do
            produto ${instructionData.whatProduct.productName} de linha ${instructionData.whatProduct.productLine} de versão ${instructionData.whatProduct.version}?`}
          </span>
          <button onClick={handleRestoreFunction}>
            Sim, Reativar produto!
          </button>
        </ActiveInstructionContainer>
      </Content>
    </div>
  )
}
