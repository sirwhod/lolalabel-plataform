import { ActionButtons, ActionButtonsContainer } from './styled'

import * as Dialog from '@radix-ui/react-dialog'
import { Check, X } from 'phosphor-react'
import { InstructionComponent } from '../../../components/InstructionComponent'
import { AcceptInstruction } from './Dialog/Accept'
import { RejectInstruction } from './Dialog/Reject'
import { Instruction } from '../../../../../context/InstructionsContext'

interface InstructionValidationProps {
  instructionData: Instruction
}

export function InstructionValidation({
  instructionData,
}: InstructionValidationProps) {
  const { whatProduct } = instructionData

  return (
    <InstructionComponent
      productData={whatProduct}
      instructionData={instructionData}
    >
      <ActionButtonsContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButtons statusColor="green" title="Aceitar instrução">
              <Check size={24} weight="bold" />
            </ActionButtons>
          </Dialog.Trigger>
          <Dialog.Portal>
            <AcceptInstruction instructionData={instructionData} />
          </Dialog.Portal>
        </Dialog.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButtons statusColor="red" title="Rejeitar instrução">
              <X size={24} weight="bold" />
            </ActionButtons>
          </Dialog.Trigger>
          <Dialog.Portal>
            <RejectInstruction instructionData={instructionData} />
          </Dialog.Portal>
        </Dialog.Root>
      </ActionButtonsContainer>
    </InstructionComponent>
  )
}
