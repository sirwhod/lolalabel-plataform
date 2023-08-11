import {
  Archive,
  Book,
  Check,
  EyeSlash,
  MagnifyingGlass,
  Pencil,
  QrCode,
  X,
} from 'phosphor-react'
import {
  Card,
  CardContainer,
  CardsContainer,
  HomePageContainer,
} from './styles'
import { useContext, useEffect } from 'react'
import { ProductsContext } from '../../context/ProductContext'
import { useAuth } from '../../context/AuthProvider/useAuth'
import { InstructionsContext } from '../../context/InstructionsContext'

export function Home() {
  const auth = useAuth()
  const { countProducts, fetchCountProducts } = useContext(ProductsContext)
  const { countInstructions, fetchCountInstructions } =
    useContext(InstructionsContext)

  useEffect(() => {
    fetchCountProducts()
    fetchCountInstructions()
  }, [])

  return (
    <HomePageContainer>
      <div>
        <h1>Seja Bem-Vindo(a), {auth.userAuth?.user?.name}!</h1>
        <span>
          Nesta página poderemos ver alguns resumos e novidades sobre a
          plataforma!
        </span>
      </div>

      <h2>Contadores Gerais</h2>
      <CardsContainer>
        <CardContainer>
          <h2>Produtos</h2>
          <Archive size={128} weight="fill" />
          <div>
            <Card statusColor="black">
              <span>
                <Archive size={18} weight="fill" />
                Produtos cadastrados
              </span>
              <strong>
                <Pencil size={64} weight="fill" />
                {countProducts?.registredProduct}
              </strong>
            </Card>

            <Card statusColor="yellow">
              <span>
                <Archive size={18} weight="fill" />
                Produtos em validação
              </span>
              <strong>
                <MagnifyingGlass size={64} weight="fill" />
                {countProducts?.productsInValidation}
              </strong>
            </Card>

            <Card statusColor="green">
              <span>
                <Archive size={18} weight="fill" />
                Produtos aceitos
              </span>
              <strong>
                <Check size={64} weight="bold" />
                {countProducts?.productsAccepted}
              </strong>
            </Card>

            <Card statusColor="red">
              <span>
                <Archive size={18} weight="fill" />
                Produtos rejeitados
              </span>
              <strong>
                <X size={64} weight="bold" />
                {countProducts?.productsRejected}
              </strong>
            </Card>

            <Card statusColor="purple">
              <span>
                <Archive size={18} weight="fill" />
                Produtos desativados
              </span>
              <strong>
                <EyeSlash size={64} weight="fill" />
                {countProducts?.productsDisabled}
              </strong>
            </Card>

            <Card statusColor="blue">
              <span>
                <Archive size={18} weight="fill" />
                QRCode Criados
              </span>
              <strong>
                <QrCode size={64} weight="fill" />
                {countProducts?.qrcodeGenerated}
              </strong>
            </Card>
          </div>
        </CardContainer>
        <CardContainer>
          <h2>Instruções</h2>
          <Book size={128} weight="fill" />
          <div>
            <Card statusColor="black">
              <span>
                <Book size={18} weight="fill" />
                Instruções cadastradas
              </span>
              <strong>
                <Pencil size={64} weight="fill" />
                {countInstructions?.registredInstruction}
              </strong>
            </Card>

            <Card statusColor="yellow">
              <span>
                <Book size={18} weight="fill" />
                Instruções em validação
              </span>
              <strong>
                <MagnifyingGlass size={64} weight="fill" />
                {countInstructions?.instructionsInValidation}
              </strong>
            </Card>

            <Card statusColor="green">
              <span>
                <Book size={18} weight="fill" />
                Instruções aceitas
              </span>
              <strong>
                <Check size={64} weight="bold" />
                {countInstructions?.instructionsAccepted}
              </strong>
            </Card>

            <Card statusColor="red">
              <span>
                <Book size={18} weight="fill" />
                Instruções rejeitadas
              </span>
              <strong>
                <X size={64} weight="bold" />
                {countInstructions?.instructionsRejected}
              </strong>
            </Card>

            <Card statusColor="purple">
              <span>
                <Book size={18} weight="fill" />
                Instruções desativadas
              </span>
              <strong>
                <EyeSlash size={64} weight="fill" />
                {countInstructions?.instructionsDisabled}
              </strong>
            </Card>
          </div>
        </CardContainer>
      </CardsContainer>
    </HomePageContainer>
  )
}
