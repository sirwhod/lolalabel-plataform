import { styled } from 'styled-components'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { NavLink } from 'react-router-dom'

export const HeaderContainer = styled.header`
  position: fixed;
  z-index: 10000;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  background-color: ${(props) => props.theme['white-50']};

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  > a {
    margin-left: 1rem;
    font-size: 1.5rem;
    text-decoration: none;
    color: ${(props) => props.theme['black-100']};
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    &:hover {
      color: ${(props) => props.theme['black-50']};
    }

    img {
      width: 2.25rem;
    }
  }
`

export const HeaderNavContainer = styled(NavigationMenu.List)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;

  list-style: none;
  padding: 1rem;
`

export const HeaderNavTrigger = styled(NavigationMenu.Trigger)`
  border: none;
  background-color: transparent;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme['white-50']};

  font-size: 1rem;
  font-weight: 600;

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme['black-100']};
  }
`

export const HeaderNavMenuContent = styled(NavigationMenu.Content)`
  margin-top: 1rem;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;

  background-color: ${(props) => props.theme['black-50']};
  padding: 1rem;
  border-radius: 5px;

  color: ${(props) => props.theme['white-50']};

  &::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    left: 0.75rem;
    top: -0.25rem;
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
    border-bottom: 0.4rem solid ${(props) => props.theme['black-100']};
  }
`

export const HeaderNavInfosContainer = styled.div`
  min-width: 15rem;
  max-width: 15rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  padding: 1rem;
  border-radius: 5px;

  background-color: ${(props) => props.theme['white-100']};

  color: ${(props) => props.theme['black-100']};

  h1 {
    font-size: 1rem;
  }

  strong {
    font-size: 0.8rem;
  }

  span {
    font-size: 0.6rem;
  }
`

export const HeaderNavLinkContainer = styled(NavLink)`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;

  text-decoration: none;
  color: ${(props) => props.theme['white-50']};
  padding: 0.3rem;

  svg {
    flex-shrink: 0;
  }

  font-size: 0.8rem;

  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme['white-50']};
  }
`

export const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  color: ${(props) => props.theme['black-100']};
  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  border-bottom: 2px solid ${(props) => props.theme['white-50']};

  &:hover {
    border-bottom: 2px solid ${(props) => props.theme['black-100']};
  }
`

export const HeaderUserContainer = styled.div`
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

    &:first-child {
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  img {
    flex-shrink: 0;
    height: 1.5rem;
    width: 1.5rem;
    border-radius: 10000px;
  }

  > div {
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

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background-color: transparent;

    cursor: pointer;

    border-radius: 10000px;

    &:hover {
      color: ${(props) => props.theme['black-200']};
    }
  }
`

export const HeaderButtonExit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.6875rem;
  height: 3.6875rem;

  border: none;
  border-radius: 0 !important;
  background-color: ${(props) => props.theme['black-100']} !important;
  color: ${(props) => props.theme['white-50']} !important;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme['black-50']} !important;
  }
`
