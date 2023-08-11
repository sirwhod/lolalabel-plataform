import { Archive, Book } from 'phosphor-react'

import { History as HistoryProps } from '../../../../context/HistoryContext'
import { HistoryContainer, LogContent, ProductContent } from './styled'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { US, BR, ES, DE, RU, FR } from 'country-flag-icons/react/3x2'

interface HistoryComponentProps {
  historyData: HistoryProps
}

export function HistoryComponent({ historyData }: HistoryComponentProps) {
  const { action, agent, creationDate, itemName, productOrInstruction } =
    historyData

  if (productOrInstruction) {
    const itemNameSplited = itemName.split(' - ')

    return (
      <HistoryContainer>
        <ProductContent>
          <div>
            <h1>{itemNameSplited[0]}</h1>
            <strong>{itemNameSplited[1]}</strong>
            <span>{itemNameSplited[3]}</span>
            <p>{itemNameSplited[2]}</p>
          </div>
        </ProductContent>

        <LogContent>
          <h2>{action}</h2>
          <span>{`Operador: ${agent.name}`}</span>
          <time
            title={format(
              new Date(creationDate),
              "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'",
              {
                locale: ptBR,
              },
            )}
          >{`Data da operação: ${formatDistanceToNow(new Date(creationDate), {
            addSuffix: true,
            locale: ptBR,
          })}`}</time>
        </LogContent>
        <div title="Produto">
          <Archive size={24} weight="fill" />
        </div>
      </HistoryContainer>
    )
  } else {
    const itemNameSplited = itemName.split(' - ')
    return (
      <HistoryContainer>
        <ProductContent>
          <div>
            <h1>
              {itemNameSplited[0] === 'Português' ? (
                <>
                  <BR />
                  {itemNameSplited[0]}
                </>
              ) : itemNameSplited[0] === 'Inglês' ? (
                <>
                  <US />
                  {itemNameSplited[0]}
                </>
              ) : itemNameSplited[0] === 'Espanhol' ? (
                <>
                  <ES />
                  {itemNameSplited[0]}
                </>
              ) : itemNameSplited[0] === 'Alemão' ? (
                <>
                  <DE />
                  {itemNameSplited[0]}
                </>
              ) : itemNameSplited[0] === 'Russo' ? (
                <>
                  <RU />
                  {itemNameSplited[0]}
                </>
              ) : (
                itemNameSplited[0] === 'Francês' && (
                  <>
                    <FR />
                    {itemNameSplited[0]}
                  </>
                )
              )}
            </h1>
            <strong>
              {itemNameSplited[1]} - {itemNameSplited[2]}
            </strong>
            <span>{itemNameSplited[4]}</span>
            <p>{itemNameSplited[3]}</p>
          </div>
        </ProductContent>

        <LogContent>
          <h2>{action}</h2>
          <span>{`Operador: ${agent.name}`}</span>
          <time
            title={format(
              new Date(creationDate),
              "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'",
              {
                locale: ptBR,
              },
            )}
          >{`Data da operação: ${formatDistanceToNow(new Date(creationDate), {
            addSuffix: true,
            locale: ptBR,
          })}`}</time>
        </LogContent>
        <div title="Instrução">
          <Book size={24} weight="fill" />
        </div>
      </HistoryContainer>
    )
  }
}
