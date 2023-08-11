import { styled } from 'styled-components'

import * as Select from '@radix-ui/react-select'

export const FormNewInstruction = styled.form`
  margin-top: 1rem;
  width: 100%;
  border-radius: 6px;
  background-color: ${(props) => props.theme['white-50']};

  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div:first-child {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;

    > div:first-child {
      max-width: 17.5rem;
    }
  }

  button[type='submit'] {
    margin-top: 1rem;
    width: 100%;
    height: 3.6875rem;
    padding: 0.5rem 6.25rem;

    border: none;

    background: ${(props) => props.theme['black-100']};
    border-radius: 10px;
    color: ${(props) => props.theme['white-100']};

    font-size: 1.3rem;
    font-weight: 600;

    cursor: pointer;

    &:hover {
      background: ${(props) => props.theme['white-200']};
      color: ${(props) => props.theme['black-100']};

      transition: all 0.3s;
    }
  }
`

export const Message = styled.span`
  margin-top: 1rem;
  font-family: 'Roboto';
  font-size: 0.9rem;
  max-width: 25rem;
  opacity: 0.9;
  color: ${(props) => props.theme['black-300']};
`

export const TriggerSelect = styled(Select.Trigger)`
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1;
  height: 2rem;
  gap: 0.5rem;
  border: none;
  background-color: ${(props) => props.theme['black-100']};
  color: ${(props) => props.theme['white-100']};
  cursor: pointer;

  svg {
    margin-right: 0.5rem;
    width: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme['black-200']};
    transition: background-color 0.3s;
  }

  &[data-placeholder] {
    color: ${(props) => props.theme['white-100']};

    svg {
      width: 1rem;
      margin-right: 0.5rem;
    }
  }
`

export const ContentSelect = styled(Select.Content)`
  position: absolute;
  z-index: 100000;

  background-color: ${(props) => props.theme['black-100']};
  color: ${(props) => props.theme['white-100']};

  border-radius: 5px;
  padding: 1rem;
`

export const ViewportSelect = styled(Select.Viewport)`
  padding: 5px;
  color: ${(props) => props.theme['white-100']};
`

export const ItemSelect = styled(Select.Item)`
  min-width: 10rem;
  font-size: 13px;
  line-height: 1;
  color: ${(props) => props.theme['white-100']};
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

  svg {
    width: 1rem;
    margin-right: 0.5rem;
  }
`

export const ItemText = styled(Select.ItemText)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

export const MarkDownContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    label {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`

export const ButtonSubmitDiv = styled.footer`
  width: 100%;

  height: 5rem;

  padding-top: 1.5rem;

  display: flex;
  flex-direction: row;
  align-items: center;
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
