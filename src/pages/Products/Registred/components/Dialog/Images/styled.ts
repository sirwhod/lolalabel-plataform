import { styled } from 'styled-components'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'

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

export const FormProductImage = styled.form`
  max-width: 40rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    margin-top: -0.8rem;
    padding: 0.4375rem;
    gap: 1rem;
    border: none;
    background: ${(props) => props.theme['white-100']};
    border-radius: 5px;
    min-width: 16rem;
    width: 100%;

    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.9;
    color: ${(props) => props.theme['white-300']};
  }
`

export const ImagesContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;

  > div:first-child {
    flex: 1;
    max-width: 30rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;

    input {
      width: 100%;
    }

    svg {
      width: 100%;
    }
  }
`

export const ProductImageDiv = styled.div`
  label {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 2.1875rem;
  }

  span {
    margin-top: -1.5rem;
    font-family: 'Roboto';
    font-size: 0.9rem;
  }

  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 256px;
    }
  }
`

export const CheckboxComplementaryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  strong {
    font-size: 1.5rem;
  }

  span {
    font-family: 'Roboto';
    font-size: 0.9rem;
  }

  main {
    margin-top: 1rem;
    max-width: 40rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
  }
`

export const CheckboxButton = styled(Checkbox.Root)`
  min-width: 6rem;
  min-height: 6rem;
  background-color: ${(props) => props.theme['white-100']};

  border: 0;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  padding: 1rem;

  cursor: pointer;

  img {
    width: 5rem;
    height: 5rem;
  }

  svg {
    color: ${(props) => props.theme['black-100']};
    flex-shrink: 0;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  }

  &:not([data-state='checked']):hover {
    transform: scale(1.1);
    background-image: radial-gradient(
      ${(props) => props.theme['green-500']} 20%,
      ${(props) => props.theme['green-500']} 30%,
      ${(props) => props.theme['green-300']}
    );
    svg {
      color: ${(props) => props.theme['white-100']};
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    }
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
  }

  &[data-state='checked'] {
    min-width: 6rem;
    min-height: 6rem;
    background-image: radial-gradient(
      ${(props) => props.theme['green-300']} 20%,
      ${(props) => props.theme['green-300']} 30%,
      ${(props) => props.theme['green-500']}
    );
    svg {
      color: ${(props) => props.theme['white-100']};
    }

    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }
`

export const ButtonSubmitDiv = styled.footer`
  width: 100%;

  height: 5rem;

  padding-top: 1.5rem;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  span {
    font-family: 'Roboto';
    font-size: 0.9rem;
    max-width: 25rem;
    opacity: 0.9;
  }

  button[type='submit'] {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.625rem 6.25rem;
    width: calc(50% - 0.625rem);
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

    &:hover {
      background-color: ${(props) => props.theme['white-200']};
      color: ${(props) => props.theme['black-50']};
    }
  }
`
