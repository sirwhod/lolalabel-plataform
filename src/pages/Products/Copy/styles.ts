import { styled } from 'styled-components'
import * as Checkbox from '@radix-ui/react-checkbox'

export const CopyProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const CopyProductContent = styled.div`
  max-width: 69.375rem;
  width: 100%;
  background-color: ${(props) => props.theme['white-50']};
  padding: 1rem;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;

    h1 {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
    }

    span {
      font-size: 0.9rem;
      font-family: 'Roboto';
      opacity: 0.9;
    }
  }
`
export const InputVersion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.4375rem;
  gap: 1rem;
  border: none;
  background: ${(props) => props.theme['white-200']};
  border-radius: 5px;

  max-width: 15rem;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.9;
  color: ${(props) => props.theme['white-300']};

  > input {
    max-width: 30%;
    background-color: transparent;
    border: none;
    border-radius: 5px;
  }
`

export const CheckboxContainer = styled.div`
  max-width: 20rem;
  display: flex;
  flex-direction: row;
  align-items: center;
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

export const MDContainer = styled.div`
  width: 100%;
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
    color: ${(props) => props.theme['black-300']};
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

export const FormCopyProduct = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const FormCopyProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`

export const FormCopyProductCardProduct = styled.div`
  max-width: 17.5rem;
  width: 100%;
`

export const FormCopyProductContent = styled.div`
  flex: 1;
  width: 100%;
`

export const FormCopyProductInputs = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`
