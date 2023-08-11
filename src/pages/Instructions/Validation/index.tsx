import { MagnifyingGlass } from 'phosphor-react'
import {
  InstructionsContainer,
  ValidateInstructionContainer,
  ValidateInstructionContent,
} from './styles'
import { InstructionValidation } from './components/Instruction'
import { useContext } from 'react'
import { InstructionsContext } from '../../../context/InstructionsContext'
import { InstructionEmpty } from '../components/InstructionEmpty'
import { SearchForm } from '../../../components/SearchForm'
import { useAuth } from '../../../context/AuthProvider/useAuth'
import { Navigate } from 'react-router-dom'

export function ValidateInstructions() {
  const { instructionsValidation } = useContext(InstructionsContext)
  const { userAuth } = useAuth()

  if (
    userAuth?.user?.permission === 'MKT1' ||
    userAuth?.user?.permission === 'MKT2'
  ) {
    return <Navigate to="/home" />
  }

  return (
    <ValidateInstructionContainer>
      <ValidateInstructionContent>
        <header>
          <h1>
            <MagnifyingGlass size={32} weight="fill" />
            Validar instruções
          </h1>

          <span>Visualize todas as instruções desativadas</span>
        </header>

        <SearchForm page="Validation" type="Instructions" />

        <InstructionsContainer>
          {instructionsValidation.length > 0 ? (
            instructionsValidation.map((instruction) => {
              return (
                <InstructionValidation
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
      </ValidateInstructionContent>
    </ValidateInstructionContainer>
  )
}
