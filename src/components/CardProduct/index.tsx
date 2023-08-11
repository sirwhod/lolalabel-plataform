import {
  CardProductContainer,
  CardProductContentBack,
  CardProductContentFront,
} from './styled'

import { Product as ProductInterface } from '../../context/ProductContext'
import MDEditor from '@uiw/react-md-editor'

interface ProductProps {
  productData: ProductInterface
}

export function CardProduct({ productData }: ProductProps) {
  const { productLine, productName, productImage, Stamps, composition } =
    productData

  return (
    <CardProductContainer>
      <CardProductContentFront>
        <strong>{productLine}</strong>
        <span>{productName}</span>
        <img src={productImage} alt="" />
        <div>
          {Stamps.map((stamp) => {
            if (stamp.active === true) {
              return <img key={stamp.image} src={stamp.image} alt="" />
            } else {
              return null
            }
          })}
        </div>
        <span>{productData.sku}</span>
        <p>{productData.version}</p>
      </CardProductContentFront>
      <CardProductContentBack>
        <div className="container" data-color-mode="dark">
          <MDEditor.Markdown source={composition} />
        </div>
      </CardProductContentBack>
    </CardProductContainer>
  )
}
