import { styled } from 'styled-components'

export const SearchContent = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  input {
    flex: 1;
    height: 2.5rem;
    padding: 1rem;
    gap: 1rem;
    border: none;
    background: ${(props) => props.theme['white-100']};
    border-radius: 5px;

    width: 100%;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.9;
    color: ${(props) => props.theme['white-300']};
  }
`

const STATUS_COLOR = {
  black: 'black-100',
  red: 'red-100',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const SearchButton = styled.button<StatusProps>`
  height: 2.5rem;
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
`
