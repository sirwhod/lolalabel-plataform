import { styled } from 'styled-components'

export const HomePageContainer = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  > div {
    span {
      color: ${(props) => props.theme['black-300']};
    }
  }
`
export const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`

export const CardContainer = styled.header`
  max-width: 34.6875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;

  gap: 1rem;

  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
  }
`

const STATUS_COLOR = {
  black: 'black-100',
  blue: 'blue-100',
  green: 'green-300',
  yellow: 'yellow-500',
  red: 'red-500',
  purple: 'purple-100',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const Card = styled.div<StatusProps>`
  max-width: 15.8rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 2rem;

  border-radius: 10px;

  background-color: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};

  color: ${(props) => props.theme['white-50']};

  span {
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: ${(props) => props.theme['white-50']} !important;
  }

  strong {
    width: 100%;
    font-size: 3rem;
    text-align: left;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    color: ${(props) => props.theme['white-50']};
  }
`
