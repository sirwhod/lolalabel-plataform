import { Book, Check, GlobeHemisphereWest, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import {
  ActionButtons,
  ActionButtonsContainer,
  ProductValidationContainer,
} from './styled'
import { AcceptProduct } from '../Dialog/Accept'
import { RejectProduct } from '../Dialog/Reject'
import { Product } from '../../../components/Product'
import { NavLink } from 'react-router-dom'

import { Product as ProductProps } from '../../../../../context/ProductContext'

interface productValidationProps {
  productData: ProductProps
}

export function ProductValidation({ productData }: productValidationProps) {
  return (
    <ProductValidationContainer>
      <Product productData={productData} />
      <ActionButtonsContainer>
        <NavLink to={`/instructions/register/Validation/${productData.id}`}>
          <ActionButtons statusColor="purple" title="Criar nova instrução">
            <Book size={24} weight="fill" />
          </ActionButtons>
        </NavLink>

        <NavLink to={`/products/validation/${productData.id}`}>
          <ActionButtons statusColor="blue" title="Criar nova instrução">
            <GlobeHemisphereWest size={24} weight="fill" />
          </ActionButtons>
        </NavLink>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButtons statusColor="green" title="Validar produto">
              <Check size={24} weight="bold" />
            </ActionButtons>
          </Dialog.Trigger>
          <Dialog.Portal>
            <AcceptProduct productData={productData} />
          </Dialog.Portal>
        </Dialog.Root>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButtons statusColor="red" title="Rejeitar produto">
              <X size={24} weight="bold" />
            </ActionButtons>
          </Dialog.Trigger>
          <Dialog.Portal>
            <RejectProduct productData={productData} />
          </Dialog.Portal>
        </Dialog.Root>
      </ActionButtonsContainer>
    </ProductValidationContainer>
  )
}
