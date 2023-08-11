import { styled } from 'styled-components'

export const UserRegistredContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: 1rem;
  background-color: ${(props) => props.theme['white-100']};
  border-radius: 5px;

  > div {
    display: flex;
    flex-direction: column;
  }
`

export const InfoUserContent = styled.header`
  display: flex;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 1rem !important;

  svg {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    padding: 0.5rem;
    background-color: ${(props) => props.theme['black-100']};
    color: ${(props) => props.theme['white-100']};
    border-radius: 100000px;
  }

  > div {
    display: flex;
    flex-direction: column;
  }
`

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row !important;
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

export const ActionButton = styled.button<StatusProps>`
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
