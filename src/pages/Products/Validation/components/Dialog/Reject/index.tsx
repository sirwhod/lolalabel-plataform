import {
  CloseButton,
  Content,
  Overlay,
  RejectProductContainer,
  Title,
} from './styled'
import { X } from 'phosphor-react'

import {
  Product as ProductProps,
  ProductsContext,
} from '../../../../../../context/ProductContext'
import { useContext, useState } from 'react'
import { CardProduct } from '../../../../../../components/CardProduct'
import { LoadingButton } from '../../../../../../components/LoadingButton'

interface rejectProductProps {
  productData: ProductProps
  actionFunction?: () => void
}

export function RejectProduct({
  productData,
  actionFunction,
}: rejectProductProps) {
  const [rejectedProduct, setRejectedProduct] = useState<boolean>(false)
  const { rejectProduct } = useContext(ProductsContext)

  async function handleRejectProduct() {
    setRejectedProduct(true)
    await rejectProduct(productData.id).finally(() => setRejectedProduct(false))
    if (actionFunction) {
      actionFunction()
    }
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <X size={32} weight="fill" />
          Rejeitar produto
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <div>
          <CardProduct productData={productData} />
        </div>

        <RejectProductContainer>
          <span>{`Rejeitar o produto significa que o produto será desabilitado e não ficará visivel para o usuário nem para o cliente final. `}</span>
          <strong>{`Tem certeza que deseja rejeitar o produto ${productData.productName} - ${productData.productLine} - ${productData.version} ?`}</strong>
          {rejectedProduct ? (
            <>
              <LoadingButton
                statusColor="black"
                statusHeight="complete"
                statusWidth="complete"
              />
            </>
          ) : (
            <button onClick={handleRejectProduct}>
              Sim, rejeitar produto!
            </button>
          )}
        </RejectProductContainer>
      </Content>
    </div>
  )
}
