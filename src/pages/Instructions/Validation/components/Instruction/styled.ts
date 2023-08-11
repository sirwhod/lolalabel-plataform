import { styled } from 'styled-components'

export const InstructionContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    'cardProduc LanguagesIntructionsContainer LanguagesIntructionsContainer LanguagesIntructionsContainer'
    'footer footer footer footer';
  gap: 1rem;

  padding: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme['white-100']};

  header {
    min-width: 16.5rem;
    min-height: 19.5rem;
    grid-area: cardProduc;
  }

  footer {
    grid-area: footer;
    width: 100%;
    flex: 1rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;

    > div {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }
  }
`

export const LanguagesIntructionsContainer = styled.div`
  grid-area: LanguagesIntructionsContainer;
  padding: 0.5rem;
  background-color: ${(props) => props.theme['white-50']};

  border-radius: 5px;

  max-height: 19.5rem;
  overflow: auto;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  border: 2px solid ${(props) => props.theme['white-50']};

  &::-webkit-scrollbar {
    width: 0.75rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme['black-300']};
    border-radius: 20px;
    border: 3px solid ${(props) => props.theme['white-50']};
  }
`
export const ActionButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start !important;
  justify-content: flex-start !important;
  gap: 0.5rem;
`
const STATUS_COLOR = {
  yellow: 'yellow-100',
  purple: 'purple-100',
  blue: 'blue-100',
  green: 'green-100',
  red: 'red-100',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const ActionButtons = styled.button<StatusProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme['black-100']};
  color: ${(props) => props.theme['white-50']};

  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.theme[STATUS_COLOR[props.statusColor]]};
    color: ${(props) => props.theme['black-100']};

    transition: all 0.3s;
  }
`
