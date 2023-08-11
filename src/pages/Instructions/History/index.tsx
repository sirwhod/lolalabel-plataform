import { ClockCounterClockwise } from 'phosphor-react'
import {
  InstructionsContainer,
  RegistredInstructionContainer,
  RegistredInstructionContent,
} from './styles'
import { InstructionHistory } from './components/Instruction'
import { useContext } from 'react'
import { InstructionsContext } from '../../../context/InstructionsContext'
import { InstructionEmpty } from '../components/InstructionEmpty'
import { SearchForm } from '../../../components/SearchForm'

export function HistoryInstructions() {
  const { instructionsHistory } = useContext(InstructionsContext)

  return (
    <RegistredInstructionContainer>
      <RegistredInstructionContent>
        <header>
          <h1>
            <ClockCounterClockwise size={32} weight="fill" />
            Histórico de Instruções
          </h1>

          <span>Visualize todas as instruções desativadas</span>
        </header>

        <SearchForm page="History" type="Instructions" />

        <InstructionsContainer>
          {instructionsHistory.length > 0 ? (
            instructionsHistory.map((intruction) => {
              return (
                <InstructionHistory
                  key={intruction.id}
                  instructionData={intruction}
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
