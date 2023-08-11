import { Archive, MagnifyingGlass } from 'phosphor-react'
import {
  ProductsContainer,
  ValidationProductContainer,
  ValidationProductContent,
} from './styles'
import { ProductValidation } from './components/ProductValidation'
import { SearchForm } from '../../../components/SearchForm'
import { useContext } from 'react'
import { ProductsContext } from '../../../context/ProductContext'
import { EmptyProductsFound } from '../Registred/styles'
import { useAuth } from '../../../context/AuthProvider/useAuth'
import { Navigate } from 'react-router-dom'

export function ValidationProduct() {
  const { productsValidation } = useContext(ProductsContext)
  const { userAuth } = useAuth()

  if (
    userAuth?.user?.permission === 'MKT1' ||
    userAuth?.user?.permission === 'MKT2'
  ) {
    return <Navigate to="/home" />
  }

  return (
    <ValidationProductContainer>
      <ValidationProductContent>
        <header>
          <h1>
            <MagnifyingGlass size={32} weight="fill" />
            Validar produtos
          </h1>

          <span>Visualize todos os produtos a serem validados</span>
        </header>

        <SearchForm page="Validation" type="Products" />

        <ProductsContainer>
          {productsValidation && productsValidation.length > 0 ? (
            productsValidation.map((product) => {
              return (
                <ProductValidation key={product.id} productData={product} />
              )
            })
          ) : (
            <EmptyProductsFound>
              <Archive size={128} weight="fill" />
              <span>Nenhum produto encontrado!</span>
            </EmptyProductsFound>
          )}
        </ProductsContainer>
      </ValidationProductContent>
    </ValidationProductContainer>
  )
}
