import { styled } from 'styled-components'

export const ProductRegistredContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 1rem;

  background-color: ${(props) => props.theme['white-100']};
  border-radius: 5px;
`

export const DataProductContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      flex: 1;
    }

    svg {
      flex: 1;
    }

    strong {
      font-size: 1rem;
    }
  }

  > div {
    &:last-child {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      padding: 1rem;
      span {
        font-size: 0.9rem;
        font-weight: bold;
      }
      time {
        font-size: 0.8rem;
      }
    }
  }
`

export const DataProductContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
`

export const ActionButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
`

const STATUS_COLOR_INSTRUCTION = {
  disabled: 'red-100',
  inValidation: 'yellow-500',
  active: 'green-500',
} as const

interface StatusPropsInstruction {
  validate: keyof typeof STATUS_COLOR_INSTRUCTION
}

export const RegistredInstructionProduct = styled.span<StatusPropsInstruction>`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  svg {
    color: ${(props) => props.theme[STATUS_COLOR_INSTRUCTION[props.validate]]};
  }
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
