import {
  CloseButton,
  Content,
  Overlay,
  Title,
  ValidateProductContainer,
} from './styled'
import { Check, X } from 'phosphor-react'

import {
  Product as ProductProps,
  ProductsContext,
} from '../../../../../../context/ProductContext'
import { CardProduct } from '../../../../../../components/CardProduct'
import { useContext, useState } from 'react'
import { LoadingButton } from '../../../../../../components/LoadingButton'

interface acceptProductProps {
  productData: ProductProps
  actionFunction?: () => void
}

export function AcceptProduct({
  productData,
  actionFunction,
}: acceptProductProps) {
  const [acceptedProduct, setAcceptedProduct] = useState<boolean>(false)
  const { acceptProduct } = useContext(ProductsContext)

  async function handleAcceptProduct() {
    setAcceptedProduct(true)
    await acceptProduct(productData.id).finally(() => setAcceptedProduct(false))
    if (actionFunction) {
      actionFunction()
    }
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <Check size={32} weight="fill" />
          Validar produto
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <div>
          <CardProduct productData={productData} />
        </div>

        <ValidateProductContainer>
          <span>{`Validar o produto significa que o produto entrará em produção, e estará visivel para o cliente final.`}</span>
          <strong>{`Tem certeza que deseja validar o produto ${productData.productName} - ${productData.productLine} - ${productData.version} ?`}</strong>
          {acceptedProduct ? (
            <>
              <LoadingButton
                statusColor="black"
                statusHeight="complete"
                statusWidth="complete"
              />
            </>
          ) : (
            <button onClick={handleAcceptProduct}>Sim, validar produto!</button>
          )}
        </ValidateProductContainer>
      </Content>
    </div>
  )
}
