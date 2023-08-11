import { Book } from 'phosphor-react'
import { EmptyInstruction } from './styled'

export function InstructionEmpty() {
  return (
    <EmptyInstruction>
      <Book size={128} weight="fill" />
      <span>Nenhuma instrução encontrada!</span>
    </EmptyInstruction>
  )
}
