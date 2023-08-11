import { styled } from 'styled-components'

import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
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

export const CardUser = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  padding: 1rem;

  background-color: ${(props) => props.theme['white-100']};
  border-radius: 5px;

  svg {
    flex-shrink: 0;
    height: 2rem;
    width: 2rem;
    padding: 0.25rem;
    background-color: ${(props) => props.theme['black-100']};
    border-radius: 1000px;
    color: ${(props) => props.theme['white-50']};
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: -0.2rem;
  }
`

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

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

  div {
    width: 100%;
  }
`

export const TriggerSelect = styled(Select.Trigger)`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;
  gap: 0.5rem;
  border: none;
  background-color: ${(props) => props.theme['white-100']};
  color: ${(props) => props.theme['black-100']};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme['white-200']};
    transition: background-color 0.3s;
  }

  &[data-placeholder] {
    width: 100%;
    color: ${(props) => props.theme['black-100']};
  }
`

export const ContentSelect = styled(Select.Content)`
  position: absolute;
  z-index: 100000;
  min-width: 20rem;

  background-color: ${(props) => props.theme['black-100']};
  color: ${(props) => props.theme['white-100']};

  border-radius: 5px;
  padding: 1rem;
`

export const ViewportSelect = styled(Select.Viewport)`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme['white-100']};
`

export const ItemSelect = styled(Select.Item)`
  min-width: 27.051875;
  width: 100%;
  font-size: 13px;
  line-height: 1;
  color: ${(props) => props.theme['white-100']};
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;

  &[data-disabled] {
    min-width: 27.051875;
    width: 100%;
    color: var(--mauve-8);
    pointer-events: none;
  }

  &[data-highlighted] {
    min-width: 27.051875;
    width: 100%;
    outline: none;
    background-color: var(--violet-9);
    color: var(--violet-1);
  }

  &:hover {
    min-width: 27.051875;
    width: 100%;
  }
`

export const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;

  label {
    color: ${(props) => props.theme['white-300']};
    font-size: 0.875rem;
    font-weight: 300;
    cursor: pointer;
  }
`

export const CheckboxButton = styled(Checkbox.Root)`
  min-width: 1.5rem;
  height: 1.5rem;
  background-color: ${(props) => props.theme['white-200']};
  border: 0;
  border-radius: 3px;

  cursor: pointer;

  &:not([data-state='checked']):hover {
    background-color: ${(props) => props.theme['black-300']};
    opacity: 0.9;
  }

  &[data-state='checked'] {
    min-width: 1.5rem;
    height: 1.5rem;
    background-color: ${(props) => props.theme['green-300']};
    color: ${(props) => props.theme['white-100']};

    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;
  }
`
