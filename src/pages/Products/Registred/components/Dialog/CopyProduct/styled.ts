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

export const ProfileProduct = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;

  padding: 0.5rem;

  div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;

    padding: 0.5rem 1.5rem;
    background-color: ${(props) => props.theme['white-100']};
    border-radius: 5px;

    header {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    footer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;

      strong {
        font-size: 1.5rem;
      }
    }
  }
`

export const MarkdownContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.5rem;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
`

export const InputVersion = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.4375rem;
  gap: 1rem;
  border: none;
  background: ${(props) => props.theme['white-100']};
  border-radius: 5px;

  width: 50%;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.9;
  color: ${(props) => props.theme['white-300']};

  > input {
    width: 100%;
    background-color: transparent;
    border: none;
  }
`

export const ButtonSubmitDiv = styled.footer`
  width: 100%;

  height: 5rem;

  padding-top: 1.5rem;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;

  span {
    font-family: 'Roboto';
    font-size: 0.9rem;
    opacity: 0.9;
  }

  button[type='submit'] {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.625rem 6.25rem;
    width: 100%;
    border: none;
    background-color: ${(props) => props.theme['black-100']};
    border-radius: 10px;

    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2.25rem;

    color: ${(props) => props.theme['white-50']};
    cursor: pointer;

    transition: all 0.2s;

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme['white-200']};
      color: ${(props) => props.theme['black-50']};
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  }
`
