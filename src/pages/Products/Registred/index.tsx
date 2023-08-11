import { Archive } from 'phosphor-react'
import {
  EmptyProductsFound,
  ProductsContainer,
  RegistredProductContainer,
  RegistredProductContent,
} from './styles'
import { ProductRegistred } from './components/ProductRegistred'
import { useContext } from 'react'

import { ProductsContext } from '../../../context/ProductContext'
import { SearchForm } from '../../../components/SearchForm'

export function RegistredProduct() {
  const { productsRegistred } = useContext(ProductsContext)

  return (
    <RegistredProductContainer>
      <RegistredProductContent>
        <header>
          <h1>
            <Archive size={32} weight="fill" />
            Produtos cadastrados
          </h1>

          <span>Visualize todos os produtos cadastrados</span>
        </header>

        <SearchForm page="Registred" type="Products" />

        <ProductsContainer>
          {productsRegistred.length > 0 ? (
            productsRegistred.map((product) => {
              return <ProductRegistred key={product.id} productData={product} />
            })
          ) : (
            <EmptyProductsFound>
              <Archive size={128} weight="fill" />
              <span>Nenhum produto encontrado!</span>
            </EmptyProductsFound>
          )}
        </ProductsContainer>
      </RegistredProductContent>
    </RegistredProductContainer>
  )
}
