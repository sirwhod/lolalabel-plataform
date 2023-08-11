import { ActionButtons, ActionButtonsContainer } from './styled'

import * as Dialog from '@radix-ui/react-dialog'
import { Eye } from 'phosphor-react'
import { InstructionComponent } from '../../../components/InstructionComponent'
import { ActiveInstruction } from './Dialog/ActiveInstruction'
import { Instruction } from '../../../../../context/InstructionsContext'

interface InstructionHistoryProps {
  instructionData: Instruction
}

export function InstructionHistory({
  instructionData,
}: InstructionHistoryProps) {
  return (
    <InstructionComponent
      instructionData={instructionData}
      productData={instructionData.whatProduct}
    >
      <ActionButtonsContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButtons statusColor="green" title="ativar instrução">
              <Eye size={24} weight="fill" />
            </ActionButtons>
          </Dialog.Trigger>
          <Dialog.Portal>
            <ActiveInstruction instructionData={instructionData} />
          </Dialog.Portal>
        </Dialog.Root>
      </ActionButtonsContainer>
    </InstructionComponent>
  )
}
