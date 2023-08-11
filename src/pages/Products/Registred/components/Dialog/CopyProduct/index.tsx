import {
  ButtonSubmitDiv,
  CloseButton,
  Content,
  InputVersion,
  Overlay,
  Title,
} from './styled'
import { ClipboardText, Warning, X } from 'phosphor-react'
import {
  Product as ProductProps,
  ProductsContext,
} from '../../../../../../context/ProductContext'
import { CardProduct } from '../../../../../../components/CardProduct'
import { useContext } from 'react'

import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorSpan } from '../../../../../../global'
import { LoadingButton } from '../../../../../../components/LoadingButton'
import { Success } from '../../../../../../components/Success'

interface CopyProductProps {
  productData: ProductProps
  openModalState: () => void
}

const copyProductSchema = z.object({
  month: z.string().nonempty('O campo de mês não pode estar vazio'),
  year: z.string().nonempty('O campo de ano não pode estar vazio'),
})

type copyProductFormInputs = z.infer<typeof copyProductSchema>

export function CopyProduct({ productData, openModalState }: CopyProductProps) {
  const { createNewProduct } = useContext(ProductsContext)

  const { id, version, Stamps, ...NewProduct } = productData

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<copyProductFormInputs>({
    resolver: zodResolver(copyProductSchema),
  })

  async function copyProduct(data: copyProductFormInputs) {
    const version = `v.${data.month}/${data.year}`
    const {
      Instructions,
      creationDate,
      isActive,
      isValidated,
      qrCodeIsActive,
      whoCreated,
      ...restProduct
    } = NewProduct

    const NewStamps = Stamps.map((stamp) => {
      const { id, ...rest } = stamp

      return { ...rest }
    })

    const newProductData = {
      version,
      Stamps: NewStamps,
      ...restProduct,
    }
    await createNewProduct(newProductData)
  }

  if (isSubmitted) {
    reset()
    setTimeout(() => {
      openModalState()
    }, 500)
  }

  return (
    <div>
      <Overlay onClick={openModalState} />
      <Content>
        <Title>
          <ClipboardText size={32} weight="fill" />
          Criar cópia do Produto
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" onClick={openModalState} />
        </CloseButton>

        <CardProduct productData={productData} />

        <form onSubmit={handleSubmit(copyProduct)}>
          <div>
            <label htmlFor="version">Nova versão</label>
            <InputVersion>
              <p>v.</p>
              <input type="text" {...register('month')} />
              {errors.month && (
                <ErrorSpan>
                  <Warning size={16} weight="fill" />
                  {errors.month.message}
                </ErrorSpan>
              )}
              <p>/</p>
              <input type="text" {...register('year')} />
              {errors.year && (
                <ErrorSpan>
                  <Warning size={16} weight="fill" />
                  {errors.year.message}
                </ErrorSpan>
              )}
            </InputVersion>
          </div>

          {isSubmitting ? (
            <LoadingButton
              statusColor="black"
              statusHeight="complete"
              statusWidth="complete"
            />
          ) : (
            <ButtonSubmitDiv>
              <button type="submit">Copiar</button>
            </ButtonSubmitDiv>
          )}

          {isSubmitted && (
            <Success isOpen={true} message="Produto copiado com sucesso!" />
          )}
        </form>
      </Content>
    </div>
  )
}
