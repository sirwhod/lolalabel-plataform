import { ActionButtons, ActionButtonsContainer } from './styled'

import * as Dialog from '@radix-ui/react-dialog'
import { EyeSlash } from 'phosphor-react'
import { DisableInstruction } from './Dialog/DisableInstruction'
import { InstructionComponent } from '../../../components/InstructionComponent'
import { Instruction } from '../../../../../context/InstructionsContext'

interface InstructionRegistredProps {
  instructionData: Instruction
}

export function InstructionRegistred({
  instructionData,
}: InstructionRegistredProps) {
  const { whatProduct } = instructionData

  return (
    <InstructionComponent
      instructionData={instructionData}
      productData={whatProduct}
    >
      <ActionButtonsContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButtons statusColor="red" title="Desativar instrução">
              <EyeSlash size={24} weight="fill" />
            </ActionButtons>
          </Dialog.Trigger>
          <Dialog.Portal>
            <DisableInstruction instructionDataId={instructionData.id} />
          </Dialog.Portal>
        </Dialog.Root>
      </ActionButtonsContainer>
    </InstructionComponent>
  )
}
