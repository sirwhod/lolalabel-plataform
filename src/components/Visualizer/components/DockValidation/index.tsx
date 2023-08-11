import {
  ActionButtons,
  ActionButtonsContainer,
  DockContainer,
  SpanValidated,
  UserContainer,
} from './styled'
import * as Dialog from '@radix-ui/react-dialog'
import { Check, CheckCircle, House, User, X, XCircle } from 'phosphor-react'
import { Product as ProductProps } from '../../../../context/ProductContext'
import { AcceptProduct } from '../../../../pages/Products/Validation/components/Dialog/Accept'
import { RejectProduct } from '../../../../pages/Products/Validation/components/Dialog/Reject'
import { useAuth } from '../../../../context/AuthProvider/useAuth'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

interface dockValidationProps {
  productData: ProductProps
}

export function DockValidation({ productData }: dockValidationProps) {
  const [isValidated, setIsValidated] = useState(productData.isValidated)
  const [isActive, setIsActive] = useState(productData.isActive)

  function acceptProduct() {
    setIsValidated(true)
    setIsActive(true)
  }

  function rejectProduct() {
    setIsValidated(true)
    setIsActive(false)
  }

  const { userAuth } = useAuth()
  return (
    <DockContainer>
      <NavLink to={`/home`}>
        <ActionButtons statusColor="blue" title="Voltar para a Página Inicial">
          <House size={24} weight="fill" />
        </ActionButtons>
      </NavLink>
      <UserContainer>
        {userAuth?.user?.imgProfile ? (
          <img src={userAuth?.user?.imgProfile} alt="" />
        ) : (
          <User size={16} weight="fill" />
        )}
        <div>
          <strong>{userAuth?.user?.name}</strong>
          <span>{userAuth?.user?.departament}</span>
        </div>
      </UserContainer>
      {isValidated ? (
        <>
          <SpanValidated statusColor={isActive ? 'green' : 'red'}>
            {isActive ? (
              <CheckCircle size={16} weight="fill" />
            ) : (
              <XCircle size={16} weight="fill" />
            )}
            {isActive ? 'Produto aceito' : 'Produto recusado'}
          </SpanValidated>
        </>
      ) : (
        <>
          <ActionButtonsContainer>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <ActionButtons statusColor="green" title="Validar produto">
                  <Check size={24} weight="bold" />
                </ActionButtons>
              </Dialog.Trigger>
              <Dialog.Portal>
                <AcceptProduct
                  productData={productData}
                  actionFunction={acceptProduct}
                />
              </Dialog.Portal>
            </Dialog.Root>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <ActionButtons statusColor="red" title="Rejeitar produto">
                  <X size={24} weight="bold" />
                </ActionButtons>
              </Dialog.Trigger>
              <Dialog.Portal>
                <RejectProduct
                  productData={productData}
                  actionFunction={rejectProduct}
                />
              </Dialog.Portal>
            </Dialog.Root>
          </ActionButtonsContainer>
        </>
      )}
    </DockContainer>
  )
}
