import { ClockCounterClockwise } from 'phosphor-react'
import { HistoryContainer, HistoryContent, Container } from './styled'
import { HistoryComponent } from './components/HistoryComponent'
import { useContext } from 'react'
import { HistorysContext } from '../../context/HistoryContext'
import { SearchForm } from '../../components/SearchForm'

export function History() {
  const { history } = useContext(HistorysContext)
  return (
    <HistoryContainer>
      <HistoryContent>
        <header>
          <h1>
            <ClockCounterClockwise size={32} weight="fill" />
            Histórico
          </h1>

          <span>Visualize todos os Movimentos</span>
        </header>

        <SearchForm page="History" type="Logs" />

        <Container>
          {history.map((item) => {
            return <HistoryComponent key={item.id} historyData={item} />
          })}
        </Container>
      </HistoryContent>
    </HistoryContainer>
  )
}
