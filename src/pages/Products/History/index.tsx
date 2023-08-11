import { Archive, ClockCounterClockwise } from 'phosphor-react'
import {
  HistoryProductContainer,
  HistoryProductContent,
  ProductsContainer,
} from './styles'
import { SearchForm } from '../../../components/SearchForm'
import { useContext } from 'react'
import { ProductsContext } from '../../../context/ProductContext'
import { EmptyProductsFound } from '../Registred/styles'
import { ProductHistory } from './components/ProductHistory'

export function HistoryProducts() {
  const { productsHistory } = useContext(ProductsContext)

  return (
    <HistoryProductContainer>
      <HistoryProductContent>
        <header>
          <h1>
            <ClockCounterClockwise size={32} weight="fill" />
            Histórico de Produtos
          </h1>

          <span>Visualize todos os produtos desabilitados</span>
        </header>

        <SearchForm page="History" type="Products" />

        <ProductsContainer>
          {productsHistory.length > 0 ? (
            productsHistory.map((product) => {
              return <ProductHistory key={product.id} productData={product} />
            })
          ) : (
            <EmptyProductsFound>
              <Archive size={128} weight="fill" />
              <span>Nenhum produto encontrado!</span>
            </EmptyProductsFound>
          )}
        </ProductsContainer>
      </HistoryProductContent>
    </HistoryProductContainer>
  )
}
