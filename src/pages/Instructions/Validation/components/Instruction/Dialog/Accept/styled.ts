import { styled } from 'styled-components'

import * as Dialog from '@radix-ui/react-dialog'

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10001;
`

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background-color: ${(props) => props.theme['white-50']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10002;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const Title = styled(Dialog.Title)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background-color: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const ValidateInstructionContainer = styled.div`
  max-width: 26rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  span {
    font-family: 'Roboto', sans-serif;
    font-size: 0.9rem;
  }

  strong {
    font-size: 0.9rem;
  }

  button {
    margin-top: 1rem;
    width: 100%;
    height: 3.6875rem;
    border: none;

    background: ${(props) => props.theme['black-100']};
    border-radius: 10px;
    color: ${(props) => props.theme['white-100']};

    font-size: 1.3rem;
    font-weight: 600;

    cursor: pointer;

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-100']};
      color: ${(props) => props.theme['black-100']};

      transition: all 0.3s;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`
