import { styled } from 'styled-components'
import * as Accordion from '@radix-ui/react-accordion'

export const VisualizerProductContainer = styled.div`
  max-width: 73.75rem;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;

  > div:first-child {
    z-index: 1;
    position: fixed;

    max-width: 73.75rem;
    width: 100%;

    > aside {
      z-index: 1;
      max-width: 17rem !important;
    }
  }

  > div:nth-child(2) {
    z-index: 1;
    width: 22rem;
  }
`
export const ContainerInstruction = styled.div`
  z-index: 2;
  min-width: 55.75rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-bottom: 7.8175rem;
`
export const EmptyInstruction = styled.div`
  width: 55.75rem;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${(props) => props.theme['black-300']};

  background-color: ${(props) => props.theme['white-50']};
  padding: 1rem;
  border-radius: 5px;
`
export const ContainderLanguage = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 5px;

  background-color: ${(props) => props.theme['white-50']};

  h1 {
    width: 100%;
    text-align: center;
  }

  span {
    font-family: 'Roboto';
    color: ${(props) => props.theme['black-300']};
    width: 100%;
    text-align: center;
  }
`

export const AccordionTrigger = styled(Accordion.Trigger)`
  width: 100%;
  background-color: transparent;
  font-size: 1.8rem;
  font-weight: bold;
  flex: 1;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme['black-100']};
  box-shadow: 0 1px 0 var(--mauve-6);
  background-color: white;

  border: none;
  border-bottom: 1px solid ${(props) => props.theme['white-200']};
  border-radius: 5px 5px 0 0;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  &:hover {
    background-color: ${(props) => props.theme['white-100']};
  }

  svg {
    width: 2.5rem;
    transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  [data-state='open'] > svg {
    transform: rotate(180deg);
  }

  [data-state='open'] {
    animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  [data-state='closed'] {
    animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: 1rem;
    }
  }

  @keyframes slideUp {
    from {
      height: 1rem;
    }
    to {
      height: 0;
    }
  }
`

export const AccordionContent = styled(Accordion.Content)`
  padding: 0.5rem;
`
