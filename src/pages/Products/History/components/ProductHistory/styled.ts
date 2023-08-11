import { styled } from 'styled-components'

export const ProductRegistredContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem;

  background-color: ${(props) => props.theme['white-100']};
  border-radius: 5px;
`

export const ActionButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
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

  &:not(:disabled):hover {
    background-color: ${(props) =>
      props.theme[STATUS_COLOR[props.statusColor]]};
    color: ${(props) => props.theme['black-100']};

    transition: all 0.3s;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
