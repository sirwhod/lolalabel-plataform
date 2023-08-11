import { styled } from 'styled-components'

export const HistoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;

  background-color: ${(props) => props.theme['white-100']};
  padding: 0.25rem;
  border-radius: 5px;

  div {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    svg {
      color: ${(props) => props.theme['black-300']};
      margin-top: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`

export const ProductContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  background-color: ${(props) => props.theme['black-100']};
  color: ${(props) => props.theme['white-50']};
  padding: 0.5rem;
  border-radius: 5px;

  div {
    min-width: 15rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  h1 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;

    svg {
      width: 3rem;
    }
  }
`

export const LogContent = styled.div`
  flex: 1;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;

  span,
  time {
    color: ${(props) => props.theme['black-300']};
  }
`
