import { styled } from 'styled-components'

export const EmptyInstruction = styled.div`
  width: 100%;
  height: 20rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    color: ${(props) => props.theme['black-300']};
  }

  span {
    color: ${(props) => props.theme['black-300']};
  }
`
