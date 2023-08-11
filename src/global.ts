import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  *{
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: .75rem;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme['black-300']};
      border-radius: 20px;
      border: 3px solid ${(props) => props.theme['white-200']};
    }
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['black-200']};
  }

  body{
    background-color: ${(props) => props.theme['white-100']};
    color: ${(props) => props.theme['black-100']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
  
`

export const ErrorSpan = styled.span`
  margin-top: -0.5rem;
  margin-left: 16.2rem;

  max-width: 13.625rem;

  position: absolute;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) => props.theme['black-50']};
  color: ${(props) => props.theme['white-50']};

  border: 1px solid ${(props) => props.theme['black-50']};
  border-radius: 5px;
  padding: 0.25rem;
  font-size: 0.8rem;

  svg {
    flex-shrink: 0;
    font-size: 1rem;
    color: ${(props) => props.theme['yellow-500']};
  }

  &::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    bottom: -0.4rem;
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
    border-top: 0.4rem solid ${(props) => props.theme['black-50']};
  }

  @media (max-width: 414px) {
    margin-top: 0.25rem;
    margin-left: 0;

    max-width: 13.625rem;

    position: absolute;

    z-index: 2;

    &::before {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      left: 0.75rem;
      top: -0.75rem;
      border-left: 0.4rem solid transparent;
      border-right: 0.4rem solid transparent;
      border-bottom: 0.4rem solid #000;
    }
  }
`

export const LoadingAnimate = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  svg {
    animation: is-rotating 1s infinite;
    color: ${(props) => props.theme['black-100']};
  }

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`
