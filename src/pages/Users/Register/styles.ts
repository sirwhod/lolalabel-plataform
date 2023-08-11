import { styled } from 'styled-components'
import * as Select from '@radix-ui/react-select'

export const RegisterUserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

export const RegisterUserFormContainer = styled.form`
  max-width: 69.375rem;
  width: 100%;
  background-color: ${(props) => props.theme['white-50']};
  padding: 1rem;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  label {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5rem;
    margin-bottom: -0.5rem;
  }

  input {
    flex: 1;
    min-width: 35%;
    padding: 0.4375rem;
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

export const RegisterUserFormContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;

  > div {
    width: 49.25%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`

export const RegisterUserFormHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
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
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme['white-100']};
`

export const ItemSelect = styled(Select.Item)`
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
    color: var(--mauve-8);
    pointer-events: none;
  }

  &[data-highlighted] {
    outline: none;
    background-color: var(--violet-9);
    color: var(--violet-1);
  }

  &:hover {
  }
`
