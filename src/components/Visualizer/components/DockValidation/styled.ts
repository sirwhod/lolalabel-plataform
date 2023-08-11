import { styled } from 'styled-components'

export const DockContainer = styled.div`
  z-index: 3;
  position: fixed;
  bottom: 25px;
  width: 25rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background-image: radial-gradient(
    transparent 20%,
    ${(props) => props.theme['white-50']} 30%,
    ${(props) => props.theme['white-200']}
  );
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(13.5px);
  -webkit-backdrop-filter: blur(13.5px);
  border-radius: 5px;
`
export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 0.5rem;
`

const STATUS_COLOR = {
  blue: 'blue-100',
  purple: 'purple-100',
  green: 'green-100',
  red: 'red-100',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}

export const ActionButtons = styled.button<StatusProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme['black-100']};
  color: ${(props) => props.theme['white-50']};

  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.theme[STATUS_COLOR[props.statusColor]]};
    color: ${(props) => props.theme['black-100']};

    transition: all 0.3s;
  }
`

export const UserContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > svg {
    flex-shrink: 0;
    height: 1.5rem;
    width: 1.5rem;
    padding: 0.2rem;

    background-color: ${(props) => props.theme['black-100']};

    border-radius: 10000px;

    color: ${(props) => props.theme['white-50']};
  }

  img {
    flex-shrink: 0;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 10000px;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    strong {
      font-size: 0.8rem;
    }

    span {
      font-size: 0.7rem;
    }
  }
`

export const SpanValidated = styled.span<StatusProps>`
  max-width: 8.5rem;
  min-height: 2.5rem;
  font-size: 0.65rem;
  font-weight: 500;
  color: ${(props) => props.theme[STATUS_COLOR[props.statusColor]]};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  background-color: ${(props) => props.theme['black-200']};

  padding: 0.25rem 0.5rem;
  border-radius: 5px;

  svg {
    flex-shrink: 0;
  }
`
