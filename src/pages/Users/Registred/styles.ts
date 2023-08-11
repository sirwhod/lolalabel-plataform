import { styled } from 'styled-components'

export const RegistredUserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const RegistredUserContent = styled.div`
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

  > button[type='submit'] {
    height: 2.5rem;
    padding: 1rem;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme['black-100']};

    color: ${(props) => props.theme['white-50']};

    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme['white-200']};
      color: ${(props) => props.theme['black-100']};
      transition: all 0.3s;
    }
  }
`

export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`
