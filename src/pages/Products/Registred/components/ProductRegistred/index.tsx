import {
  Book,
  ClipboardText,
  EyeSlash,
  PencilSimple,
  QrCode,
} from 'phosphor-react'
import {
  ActionButtons,
  ActionButtonsContainer,
  ProductRegistredContainer,
} from './styled'
import * as Dialog from '@radix-ui/react-dialog'

import { Qrcode } from '../Dialog/Qrcode'
import { DisableProduct } from '../Dialog/DisableProduct'
import { Images } from '../Dialog/Images'
import { Product } from '../../../components/Product'
import { NavLink } from 'react-router-dom'
import {
  Product as ProductProps,
  ProductsContext,
} from '../../../../../context/ProductContext'
import { useContext } from 'react'
import { useAuth } from '../../../../../context/AuthProvider/useAuth'

interface ProductRegistredProps {
  productData: ProductProps
}

export function ProductRegistred({ productData }: ProductRegistredProps) {
  const { activeQRCode } = useContext(ProductsContext)
  const { userAuth } = useAuth()

  function handleActiveQRCode() {
    activeQRCode(productData.id)
  }

  return (
    <ProductRegistredContainer>
      <Product productData={productData} />
      <ActionButtonsContainer>
        {userAuth?.user?.permission !== 'REGCAD2' && (
          <>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <ActionButtons
                  statusColor="green"
                  title="Gerar qrcode"
                  onClick={handleActiveQRCode}
                >
                  <QrCode size={24} weight="fill" />
                </ActionButtons>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Qrcode productDataId={productData.id} />
              </Dialog.Portal>
            </Dialog.Root>
          </>
        )}

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButtons statusColor="yellow" title="Editar imagens">
              <PencilSimple size={24} weight="fill" />
            </ActionButtons>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Images productData={productData} />
          </Dialog.Portal>
        </Dialog.Root>

        <NavLink to={`/instructions/register/Registred/${productData.id}`}>
          <ActionButtons statusColor="purple" title="Criar nova instrução">
            <Book size={24} weight="fill" />
          </ActionButtons>
        </NavLink>

        <NavLink to={`/products/copy/${productData.id}`}>
          <ActionButtons statusColor="blue" title="Criar cópia do produto">
            <ClipboardText size={24} weight="fill" />
          </ActionButtons>
        </NavLink>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButtons statusColor="red" title="Desativar produto">
              <EyeSlash size={24} weight="fill" />
            </ActionButtons>
          </Dialog.Trigger>
          <Dialog.Portal>
            <DisableProduct productDataId={productData.id} />
          </Dialog.Portal>
        </Dialog.Root>
      </ActionButtonsContainer>
    </ProductRegistredContainer>
  )
}
