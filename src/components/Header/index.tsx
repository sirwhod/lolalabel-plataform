import {
  Archive,
  BellSimpleSlash,
  Book,
  CaretDown,
  ClockCounterClockwise,
  Gear,
  MagnifyingGlass,
  Pencil,
  SignOut,
  User,
} from 'phosphor-react'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import * as Dialog from '@radix-ui/react-dialog'

import LogoLola from '../../assets/logo-lola.png'

import {
  HeaderButtonExit,
  HeaderContainer,
  HeaderNavContainer,
  HeaderNavInfosContainer,
  HeaderNavLink,
  HeaderNavLinkContainer,
  HeaderNavMenuContent,
  HeaderNavTrigger,
  HeaderUserContainer,
} from './styled'
import { NavLink, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { useState } from 'react'
import { AlterPassword } from '../AlterPassword'

export function Header() {
  const [connected, setConnected] = useState(true)
  const { logout, userAuth } = useAuth()

  async function handleLogout() {
    setConnected(false)
    logout()
  }

  if (!connected) {
    return <Navigate to="/" />
  }

  return (
    <HeaderContainer>
      <NavLink to="/home" title="Página inicial">
        <img src={LogoLola} alt="" />
        Plataforma rótulos
      </NavLink>

      <NavigationMenu.Root orientation="vertical">
        <HeaderNavContainer>
          <NavigationMenu.Item>
            <HeaderNavTrigger>
              Produtos
              <CaretDown size={16} />
            </HeaderNavTrigger>
            <HeaderNavMenuContent>
              <HeaderNavInfosContainer>
                <h1>Produtos</h1>
                <Archive size={64} weight="fill" />
                <strong>
                  Neste menu temos todas as ações que podemos realizar em um
                  produto dentro da plataforma.
                </strong>
                <span>
                  Selecione a opção ao lado e seja redirecionado a página que
                  deseja!
                </span>
              </HeaderNavInfosContainer>
              <div>
                <NavigationMenu.Link asChild>
                  <HeaderNavLinkContainer to="/products/register">
                    <Pencil size={16} weight="fill" />
                    Cadastro de Produtos
                  </HeaderNavLinkContainer>
                </NavigationMenu.Link>
                <NavigationMenu.Link asChild>
                  <HeaderNavLinkContainer to="/products/registred">
                    <Archive size={16} weight="fill" />
                    Produtos Cadastrados
                  </HeaderNavLinkContainer>
                </NavigationMenu.Link>
                {userAuth?.user?.permission !== 'MKT1' &&
                  userAuth?.user?.permission !== 'MKT2' && (
                    <>
                      <NavigationMenu.Link asChild>
                        <HeaderNavLinkContainer to="/products/validation">
                          <MagnifyingGlass size={16} weight="fill" />
                          Validar Produtos
                        </HeaderNavLinkContainer>
                      </NavigationMenu.Link>
                    </>
                  )}
                <NavigationMenu.Link asChild>
                  <HeaderNavLinkContainer to="/products/history">
                    <ClockCounterClockwise size={16} weight="fill" />
                    Histórico de Produtos
                  </HeaderNavLinkContainer>
                </NavigationMenu.Link>
              </div>
            </HeaderNavMenuContent>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <HeaderNavTrigger>
              Instruções
              <CaretDown size={16} />
            </HeaderNavTrigger>
            <HeaderNavMenuContent>
              <HeaderNavInfosContainer>
                <h1>Instruções</h1>
                <Book size={64} weight="fill" />
                <strong>
                  Neste menu temos todas as ações que podemos realizar em uma
                  instrução dentro da plataforma.
                </strong>
                <span>
                  Selecione a opção ao lado e seja redirecionado a página que
                  deseja!
                </span>
              </HeaderNavInfosContainer>
              <div>
                <NavigationMenu.Link asChild>
                  <HeaderNavLinkContainer to="/instructions/registred">
                    <Book size={16} weight="fill" />
                    Instruções Cadastradas
                  </HeaderNavLinkContainer>
                </NavigationMenu.Link>
                {userAuth?.user?.permission !== 'MKT1' &&
                  userAuth?.user?.permission !== 'MKT2' && (
                    <>
                      <NavigationMenu.Link asChild>
                        <HeaderNavLinkContainer to="/instructions/validation">
                          <MagnifyingGlass size={16} weight="fill" />
                          Validar Instruções
                        </HeaderNavLinkContainer>
                      </NavigationMenu.Link>
                    </>
                  )}
                <NavigationMenu.Link asChild>
                  <HeaderNavLinkContainer to="/instructions/history">
                    <ClockCounterClockwise size={16} weight="fill" />
                    Histórico de Instruções
                  </HeaderNavLinkContainer>
                </NavigationMenu.Link>
              </div>
            </HeaderNavMenuContent>
          </NavigationMenu.Item>
          {userAuth?.user?.permission === 'Administrador' && (
            <>
              <NavigationMenu.Item>
                <HeaderNavTrigger>
                  Usuários
                  <CaretDown size={16} />
                </HeaderNavTrigger>
                <HeaderNavMenuContent>
                  <HeaderNavInfosContainer>
                    <h1>Usuários</h1>
                    <User size={64} weight="fill" />
                    <strong>
                      Neste menu temos todas as ações que podemos realizar em um
                      usuário dentro da plataforma.
                    </strong>
                    <span>
                      Selecione a opção ao lado e seja redirecionado a página
                      que deseja!
                    </span>
                  </HeaderNavInfosContainer>
                  <div>
                    <NavigationMenu.Link asChild>
                      <HeaderNavLinkContainer to="/users/register">
                        <Pencil size={16} weight="fill" />
                        Cadastrar Usuários
                      </HeaderNavLinkContainer>
                    </NavigationMenu.Link>
                    <NavigationMenu.Link asChild>
                      <HeaderNavLinkContainer to="/users/registred">
                        <User size={16} weight="fill" />
                        Usuários Cadastrados
                      </HeaderNavLinkContainer>
                    </NavigationMenu.Link>
                  </div>
                </HeaderNavMenuContent>
              </NavigationMenu.Item>
            </>
          )}
          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <HeaderNavLink to="/history">
                Visualizar histórico
                <ClockCounterClockwise size={16} weight="fill" />
              </HeaderNavLink>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </HeaderNavContainer>
      </NavigationMenu.Root>
      <HeaderUserContainer>
        <BellSimpleSlash size={24} weight="fill" />
        {userAuth?.user?.imgProfile ? (
          <img src={userAuth?.user?.imgProfile} alt="" />
        ) : (
          <User size={16} weight="fill" />
        )}
        <div>
          <strong>{userAuth?.user?.name}</strong>
          <span>{userAuth?.user?.departament}</span>
        </div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button title="Alterar informações do usuário">
              <Gear size={24} weight="fill" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <AlterPassword page="Header" />
          </Dialog.Portal>
        </Dialog.Root>
        <HeaderButtonExit onClick={handleLogout}>
          <SignOut size={24} weight="fill" />
        </HeaderButtonExit>
      </HeaderUserContainer>
    </HeaderContainer>
  )
}
