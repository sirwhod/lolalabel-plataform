import { useContext } from 'react'
import { CloseButton, Content, DisableForm, Overlay, Title } from './styled'
import { EyeSlash, Warning, X } from 'phosphor-react'
import { ProductsContext } from '../../../../../../context/ProductContext'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorSpan } from '../../../../../../global'
import { LoadingButton } from '../../../../../../components/LoadingButton'
import { Success } from '../../../../../../components/Success'

interface DisableProductProps {
  productDataId: string
}

const disableProductSchema = z.object({
  reason: z.string().nonempty('Insira o motivo da desativação do Produto!'),
})

type disableProductFormInputs = z.infer<typeof disableProductSchema>

export function DisableProduct({ productDataId }: DisableProductProps) {
  const { disableProduct } = useContext(ProductsContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<disableProductFormInputs>({
    resolver: zodResolver(disableProductSchema),
  })

  async function handleDisableProduct(data: disableProductFormInputs) {
    await disableProduct(productDataId, data.reason)
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <EyeSlash size={32} weight="fill" />
          Desabilitar produto
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>

        <DisableForm onSubmit={handleSubmit(handleDisableProduct)}>
          <span>
            Desativar o produto fará com que ele não esteja mais visível para o
            consumidor final, o usuário poderá reativar o produto clicando em
            reativar na página Histórico de produtos.
          </span>
          <div>
            <label htmlFor="reason">Motivo</label>
            <textarea
              id="reason"
              placeholder="Digite aqui o motivo da desativação..."
              {...register('reason')}
            />
            {errors.reason && (
              <ErrorSpan>
                <Warning size={16} weight="fill" />
                {errors.reason.message}
              </ErrorSpan>
            )}
          </div>
          {isSubmitting ? (
            <>
              <LoadingButton
                statusColor="black"
                statusHeight="complete"
                statusWidth="complete"
              />
            </>
          ) : (
            <button type="submit">Sim, Desativar produto!</button>
          )}
          {isSubmitted && (
            <Success isOpen={true} message="Produto desativado com sucesso!" />
          )}
        </DisableForm>
      </Content>
    </div>
  )
}
