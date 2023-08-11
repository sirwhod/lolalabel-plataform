import { Eye, GlobeHemisphereWest } from 'phosphor-react'
import {
  ActionButtons,
  ActionButtonsContainer,
  ProductRegistredContainer,
} from './styled'
import { Product } from '../../../components/Product'
import { Product as ProductProps } from '../../../../../context/ProductContext'
import { NavLink } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'
import { ActiveProduct } from '../Active'

interface productHistoryProps {
  productData: ProductProps
}

export function ProductHistory({ productData }: productHistoryProps) {
  return (
    <ProductRegistredContainer>
      <Product productData={productData} />
      <ActionButtonsContainer>
        <NavLink to={`/products/validation/${productData.id}`}>
          <ActionButtons statusColor="blue" title="Criar nova instrução">
            <GlobeHemisphereWest size={24} weight="fill" />
          </ActionButtons>
        </NavLink>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButtons statusColor="green" title="Reativar produto">
              <Eye size={24} weight="fill" />
            </ActionButtons>
          </Dialog.Trigger>
          <Dialog.Portal>
            <ActiveProduct productData={productData} />
          </Dialog.Portal>
        </Dialog.Root>
      </ActionButtonsContainer>
    </ProductRegistredContainer>
  )
}
