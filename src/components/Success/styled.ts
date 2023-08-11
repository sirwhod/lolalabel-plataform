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

  span {
    color: ${(props) => props.theme['black-300']};
  }
`

export const Title = styled(Dialog.Title)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  svg {
    color: ${(props) => props.theme['green-300']};
  }
`

export const CloseButtonX = styled(Dialog.Close)`
  position: absolute;
  background-color: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${(props) => props.theme['gray-500']};
`

export const CloseButton = styled(Dialog.Close)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.625rem 6.25rem;
  width: 100%;
  border: none;
  background-color: ${(props) => props.theme['green-300']};
  border-radius: 10px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.25rem;

  color: ${(props) => props.theme['white-50']};
  cursor: pointer;

  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme['green-500']};
  }
`
