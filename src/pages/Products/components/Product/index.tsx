import {
  DataProductContainer,
  DataProductContent,
  RegistredInstructionProduct,
} from './styled'
import { CardProduct } from '../../../../components/CardProduct'
import { Translate } from 'phosphor-react'
import { Product as ProductInterface } from '../../../../context/ProductContext'

import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface ProductProps {
  productData: ProductInterface
}

export function Product({ productData }: ProductProps) {
  const {
    isActive,
    Instructions,
    whoCreated: { name },
    creationDate,
    ProductsDisabled,
  } = productData

  return (
    <DataProductContainer>
      <CardProduct productData={productData} />
      <DataProductContent>
        <div>
          <strong>Produto está ativo?</strong>
          <span>{isActive ? 'Sim' : 'Não'}</span>
        </div>

        {Instructions.length > 0 ? (
          <div>
            <strong>Instruções Cadastradas</strong>
            {Instructions.map((instruction) => {
              return (
                <RegistredInstructionProduct
                  key={instruction.id}
                  validate={
                    instruction.isActive === true
                      ? 'active'
                      : instruction.isValidated === true &&
                        instruction.isActive === false
                      ? 'disabled'
                      : 'inValidation'
                  }
                  title={
                    instruction.isActive === true
                      ? 'Ativa'
                      : instruction.isValidated === true &&
                        instruction.isActive === false
                      ? 'Desabilitada'
                      : 'Aguardando validação'
                  }
                >
                  <Translate size={24} weight="fill" />
                  {instruction.language}
                </RegistredInstructionProduct>
              )
            })}
          </div>
        ) : null}

        {ProductsDisabled.length > 0 ? (
          <div>
            <strong>Desativado?</strong>
            <span>Sim!</span>
            <strong>Porque?</strong>
            <span>{ProductsDisabled[0].reason}</span>
          </div>
        ) : null}

        <div>
          <strong>Criador</strong>
          <span>{name}</span>
        </div>
      </DataProductContent>
      <div>
        <span>Data de Criação</span>
        <time
          title={format(
            new Date(creationDate),
            "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'",
            {
              locale: ptBR,
            },
          )}
        >
          {formatDistanceToNow(new Date(creationDate), {
            addSuffix: true,
            locale: ptBR,
          })}
        </time>
      </div>
    </DataProductContainer>
  )
}
