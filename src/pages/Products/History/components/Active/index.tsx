import {
  ActiveProductContainer,
  CloseButton,
  Content,
  Overlay,
  Title,
} from './styled'
import { Eye, X } from 'phosphor-react'

import {
  Product as ProductProps,
  ProductsContext,
} from '../../../../../context/ProductContext'
import { CardProduct } from '../../../../../components/CardProduct'
import { useContext } from 'react'

interface restoreProductProps {
  productData: ProductProps
}

export function ActiveProduct({ productData }: restoreProductProps) {
  const { restoreProduct } = useContext(ProductsContext)

  function handleRestoreProduct() {
    restoreProduct(productData.id)
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <Eye size={32} weight="fill" />
          Reativar Produto
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <div>
          <CardProduct productData={productData} />
        </div>

        <ActiveProductContainer>
          <span>
            {`O produto irá voltar para a lista de validação caso seja reativado!`}
          </span>
          <span>
            {`Tem certeza que deseja reativar o produto ${productData.productName} - ${productData.productLine} - ${productData.version} ?`}
          </span>
          <button onClick={handleRestoreProduct}>Sim, Reativar produto!</button>
        </ActiveProductContainer>
      </Content>
    </div>
  )
}
