import { styled } from 'styled-components'

export const CardProductContainer = styled.aside`
  max-width: 17.5rem;
  width: 100%;

  min-height: 28.5rem;

  display: flex;
  justify-content: center;
  transform-style: preserve-3d;

  transition: all 0.5s;

  &:hover {
    transform: rotateY(180deg);
  }
`

export const CardProductContentFront = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme['black-100']};
  color: ${(props) => props.theme['white-50']};

  position: absolute !important;

  strong {
    width: 100%;
    font-family: Poppins;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  img {
    max-height: 15rem;
  }

  span {
    width: 100%;
    font-family: Poppins;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  p {
    width: 100%;
    font-family: Poppins;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  > div {
    max-width: 15rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-bottom: 0.5rem;

    > img {
      background-color: ${(props) => props.theme['white-50']};
      padding: 0.25rem;
      border-radius: 5px;
      max-width: 3.55rem;
      width: 100%;
      max-height: 4rem;
    }
  }
`

export const CardProductContentBack = styled.div`
  max-width: 17.5rem;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  background-color: #0d1117;
  color: ${(props) => props.theme['white-50']};

  transform: rotateY(180deg);

  position: absolute !important;

  backface-visibility: hidden;

  > div {
    width: 100%;
    max-height: 26.5rem;

    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.75rem;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme['black-300']};
      border-radius: 20px;
      border: 4px solid #0d1117;
    }
  }
`
