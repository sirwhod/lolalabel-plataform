import { Pencil } from 'phosphor-react'
import {
  RegisterInstructionContainer,
  RegisterInstructionContent,
} from './styles'
import { NewInstruction } from '../../../components/NewInstruction'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Product, ProductsContext } from '../../../context/ProductContext'
import { InstructionEmpty } from '../components/InstructionEmpty'

interface ParamsProps {
  page: 'Registred' | 'Validation'
  idProduct: string
}

export function RegisterInstructions() {
  const { page, idProduct } = useParams() as unknown as ParamsProps
  const { findProductByID } = useContext(ProductsContext)

  const [product, setProduct] = useState<Product>()

  async function getProductData() {
    if (idProduct) {
      const ProductData = await findProductByID(idProduct, page)

      setProduct(ProductData)
    }
  }

  useEffect(() => {
    getProductData()
  }, [])

  return (
    <RegisterInstructionContainer>
      <RegisterInstructionContent>
        <header>
          <h1>
            <Pencil size={32} weight="fill" />
            Cadastrar Instrução
          </h1>

          <span>Cadastre a instrução para o produto selecionado!</span>

          {product === undefined ? (
            <InstructionEmpty />
          ) : (
            <NewInstruction productData={product} page={page} />
          )}
        </header>
      </RegisterInstructionContent>
    </RegisterInstructionContainer>
  )
}
