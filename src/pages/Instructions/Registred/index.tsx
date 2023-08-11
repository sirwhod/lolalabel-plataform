import { Book } from 'phosphor-react'
import {
  InstructionsContainer,
  RegistredInstructionContainer,
  RegistredInstructionContent,
} from './styles'
import { InstructionRegistred } from './components/Instruction'
import { useContext } from 'react'
import { InstructionsContext } from '../../../context/InstructionsContext'
import { InstructionEmpty } from '../components/InstructionEmpty'
import { SearchForm } from '../../../components/SearchForm'

export function RegistredInstructions() {
  const { instructionsRegistred } = useContext(InstructionsContext)

  return (
    <RegistredInstructionContainer>
      <RegistredInstructionContent>
        <header>
          <h1>
            <Book size={32} weight="fill" />
            Instruções cadastradas
          </h1>

          <span>Visualize todos as instruções cadastradas</span>
        </header>

        <SearchForm page="Registred" type="Instructions" />

        <InstructionsContainer>
          {instructionsRegistred.length > 0 ? (
            instructionsRegistred.map((instruction) => {
              return (
                <InstructionRegistred
                  key={instruction.id}
                  instructionData={instruction}
                />
              )
            })
          ) : (
            <>
              <InstructionEmpty />
            </>
          )}
        </InstructionsContainer>
      </RegistredInstructionContent>
    </RegistredInstructionContainer>
  )
}
