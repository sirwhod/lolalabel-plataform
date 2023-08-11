import { styled } from 'styled-components'

export const RegistredProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const RegistredProductContent = styled.div`
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

export const ProductsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

export const EmptyProductsFound = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 5rem;
  span {
    color: ${(props) => props.theme['white-300']};
  }

  svg {
    color: ${(props) => props.theme['white-300']};
  }
`
