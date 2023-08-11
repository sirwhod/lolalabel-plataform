import {
  ButtonSubmitDiv,
  CheckboxButton,
  CheckboxComplementaryContainer,
  CloseButton,
  Content,
  FormProductImage,
  ImagesContent,
  Overlay,
  ProductImageDiv,
  Title,
} from './styled'

import { PencilSimple, X, Image as ImageIcon, Warning } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useContext, useEffect, useState } from 'react'
import {
  Product as ProductProps,
  ProductsContext,
} from '../../../../../../context/ProductContext'
import { ErrorSpan } from '../../../../../../global'

import { Controller, useForm, useFieldArray } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Success } from '../../../../../../components/Success'
import { LoadingButton } from '../../../../../../components/LoadingButton'

interface CopyProductProps {
  productData: ProductProps
}

const alterImageProductSchema = z.object({
  productImage: z
    .string()
    .url('O Campo deve ser preenchido com uma url!')
    .nonempty('O campo Imagem não pode estar vazio!'),
  Stamps: z
    .array(
      z.object({
        nameStamp: z.string(),
        image: z.string(),
        active: z.boolean(),
      }),
    )
    .refine((stamps) => {
      return stamps.some((stamp) => stamp.active === true)
    }, 'Você precisa selecionar pelo menos um selo!'),
})

type alterImageProductFormInputs = z.infer<typeof alterImageProductSchema>

export function Images({ productData }: CopyProductProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<alterImageProductFormInputs>({
    resolver: zodResolver(alterImageProductSchema),
  })

  const { alterImagesProduct } = useContext(ProductsContext)

  const [productImage, setProductImage] = useState(productData.productImage)

  function handleChangeProductImage(event: { target: { value: string } }) {
    const newImageProduct = event.target.value
    setProductImage(newImageProduct)
  }

  const { fields, append } = useFieldArray({
    control,
    name: 'Stamps',
  })

  useEffect(() => {
    productData.Stamps.map((stamp) => {
      return append({
        nameStamp: stamp.nameStamp,
        image: stamp.image,
        active: stamp.active,
      })
    })
  }, [append])

  function handleAlterImageProduct(data: alterImageProductFormInputs) {
    const { id } = productData
    const { Stamps } = data

    const newStamps = Stamps.map((stamp) => {
      const matchedStamp = productData.Stamps.find(
        (oldStamp) => oldStamp.nameStamp === stamp.nameStamp,
      )

      if (matchedStamp) {
        const id = matchedStamp.id

        return { ...stamp, id }
      } else {
        const id = 'erro'
        return { ...stamp, id }
      }
    })

    const newProductDataForm = {
      id,
      Stamps: newStamps,
      productImage: data.productImage,
    }

    alterImagesProduct(newProductDataForm)
  }

  return (
    <div>
      <Overlay />
      <Content>
        <Title>
          <PencilSimple size={32} weight="fill" />
          Editar imagens
        </Title>

        <CloseButton asChild>
          <X size={16} weight="bold" />
        </CloseButton>
        <FormProductImage onSubmit={handleSubmit(handleAlterImageProduct)}>
          <ImagesContent>
            <ProductImageDiv>
              <label htmlFor="productImage">Imagem do produto</label>
              <span>
                Para buscar o link da imagem entre em nosso SharePoint e
                compartilhe a imagem, e cole o link no campo abaixo.
              </span>

              <input
                type="url"
                id="productImage"
                placeholder="cole aqui o link da imagem do produto"
                {...register('productImage')}
                onChange={handleChangeProductImage}
              />

              {errors.productImage && (
                <ErrorSpan>
                  <Warning size={16} weight="fill" />
                  {errors.productImage.message}
                </ErrorSpan>
              )}
              <div>
                {!productImage ? (
                  <ImageIcon size={256} weight="fill" />
                ) : (
                  <img src={productImage} alt="" />
                )}
              </div>
            </ProductImageDiv>
            <CheckboxComplementaryContainer>
              <strong>Selos</strong>
              <span>Selecione os selos do produto</span>
              <main>
                {fields.map((field, index) => {
                  const imageStamp = field.image
                  const isChecked = field.active
                  return (
                    <div key={field.id}>
                      <Controller
                        control={control}
                        name={`Stamps.${index}.active`}
                        render={({ field }) => (
                          <CheckboxButton
                            defaultChecked={isChecked}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                field.onChange(true)
                              } else {
                                field.onChange(false)
                              }
                            }}
                          >
                            <img src={imageStamp} alt="" />
                            <Checkbox.Indicator />
                          </CheckboxButton>
                        )}
                      />
                    </div>
                  )
                })}
                {errors.Stamps && (
                  <ErrorSpan>
                    <Warning size={16} weight="fill" />
                    {errors.Stamps.message}
                  </ErrorSpan>
                )}
              </main>
            </CheckboxComplementaryContainer>
          </ImagesContent>
          <ButtonSubmitDiv>
            <span></span>
            {isSubmitting ? (
              <>
                <LoadingButton
                  statusColor="black"
                  statusHeight="complete"
                  statusWidth="complete"
                />
              </>
            ) : (
              <button type="submit">Alterar</button>
            )}
            {isSubmitSuccessful && (
              <Success isOpen={true} message="Imagens alteradas com sucesso!" />
            )}
          </ButtonSubmitDiv>
        </FormProductImage>
      </Content>
    </div>
  )
}
