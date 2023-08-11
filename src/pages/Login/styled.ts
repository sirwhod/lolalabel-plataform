import { styled } from 'styled-components'

export const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const LogoContent = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme['white-50']};

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 15rem;
    }

    h1 {
      font-family: 'Poppins';
      font-size: 2.5rem;
      font-weight: bold;
      color: ${(props) => props.theme['black-100']};
    }
  }
`

export const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    max-width: 25rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    background-color: ${(props) => props.theme['white-50']};
    padding: 1.5rem;
    border-radius: 5px;

    strong {
      font-size: 1.5rem;
    }

    input {
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
  }
`

export const WrongPassword = styled.span`
  position: fixed;
  bottom: 10px;
  right: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 0.5rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme['red-100']};
  color: ${(props) => props.theme['red-700']};
`
