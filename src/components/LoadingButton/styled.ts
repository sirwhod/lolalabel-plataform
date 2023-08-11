import { styled } from 'styled-components'

const STATUS_COLOR = {
  black: 'black-100',
  red: 'red-100',
} as const

const STATUS_WIDTH = {
  complete: '33.0256rem',
  search: '10.75rem',
} as const

const STATUS_HEIGHT = {
  complete: '3.5rem',
  search: '2.5rem',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
  statusWidth: keyof typeof STATUS_WIDTH
  statusHeight: keyof typeof STATUS_HEIGHT
}

export const LoadingButtonStyled = styled.button<StatusProps>`
  max-width: ${(props) => [STATUS_WIDTH[props.statusWidth]]};
  width: 100%;
  height: ${(props) => [STATUS_HEIGHT[props.statusHeight]]};
  padding: 1rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};

  color: ${(props) => props.theme['white-50']};

  cursor: pointer;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['white-100']};
    color: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};

    transition: all 0.3s;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    animation: is-rotating 1s infinite;
    color: ${(props) => props.theme['white-50']};
  }

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`
