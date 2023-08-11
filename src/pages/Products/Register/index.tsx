import { Pencil, Image as ImageIcon, Warning } from 'phosphor-react'
import {
  ButtonSubmitDiv,
  CheckboxButton,
  CheckboxComplementaryContainer,
  ImagesContent,
  InputVersion,
  InputsContainer,
  MDContainer,
  ProductImageDiv,
  RegisterProductContainer,
  RegisterProductFormContainer,
  RegisterProductFormHeader,
} from './styles'

import MDEditor, { commands } from '@uiw/react-md-editor'

import { Controller, useForm, useFieldArray } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Checkbox from '@radix-ui/react-checkbox'
import { useContext, useEffect, useState } from 'react'
import { ErrorSpan } from '../../../global'

import CertifiedVeganStamp from '../../../assets/LOLA_certified-vegan-120px.svg'
import CosmosStamp from '../../../assets/LOLA_cosmos-120px_ImgID1.png'
import GlitterStamp from '../../../assets/LOLA_glitter-120px.svg'
import PeaStamp from '../../../assets/LOLA_pea-120px.svg'
import ProtectionOfColorStamp from '../../../assets/LOLA_proteção-da-cor-120px.svg'
import RecycleStamp from '../../../assets/LOLA_reciclavel-120px.svg'
import ReuseStamp from '../../../assets/LOLA_reutilize-120px.svg'
import ThermalStamp from '../../../assets/LOLA_termico-120px.svg'
import VeganStamp from '../../../assets/LOLA_vegano-120px.svg'
import { ProductsContext } from '../../../context/ProductContext'
import { LoadingButton } from '../../../components/LoadingButton'
import { Success } from '../../../components/Success'

const registerProductSchema = z.object({
  sku: z.string().nonempty('O campo SKU não pode estar vazio!'),
  productName: z
    .string()
    .nonempty('O campo Nome do produto não pode estar vazio!'),
  productLine: z.string().nonempty('O campo Linha não pode estar vazio!'),
  month: z.string().nonempty('O campo de mês não pode estar vazio'),
  year: z.string().nonempty('O campo de ano não pode estar vazio'),
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
    .refine((Stamps) => {
      return Stamps.some((stamp) => stamp.active === true)
    }, 'Você precisa selecionar pelo menos um selo!'),
  composition: z.string(),
})

type registerProductFormInputs = z.infer<typeof registerProductSchema>

export function RegisterProduct() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<registerProductFormInputs>({
    resolver: zodResolver(registerProductSchema),
  })

  const { createNewProduct } = useContext(ProductsContext)

  const [productImage, setProductImage] = useState('')

  function handleChangeProductImage(event: { target: { value: string } }) {
    const newImageProduct = event.target.value
    setProductImage(newImageProduct)
  }

  const { fields, append } = useFieldArray({
    control,
    name: 'Stamps',
  })

  async function handleCreateNewProduct(data: registerProductFormInputs) {
    const version = `v.${data.month}/${data.year}`
    const { month, year, ...newData } = data

    const newProductData = {
      version,
      ...newData,
    }
    await createNewProduct(newProductData)
    reset()
  }

  useEffect(() => {
    const Stamps = [
      { title: 'CertifiedVeganStamp', imageStamp: CertifiedVeganStamp },
      { title: 'CosmosStamp', imageStamp: CosmosStamp },
      { title: 'GlitterStamp', imageStamp: GlitterStamp },
      { title: 'PeaStamp', imageStamp: PeaStamp },
      { title: 'ProtectionOfColorStamp', imageStamp: ProtectionOfColorStamp },
      { title: 'RecycleStamp', imageStamp: RecycleStamp },
      { title: 'ReuseStamp', imageStamp: ReuseStamp },
      { title: 'ThermalStamp', imageStamp: ThermalStamp },
      { title: 'VeganStamp', imageStamp: VeganStamp },
    ]

    Stamps.map((stamp) => {
      return append({
        nameStamp: stamp.title,
        image: stamp.imageStamp,
        active: false,
      })
    })
  }, [append])

  return (
    <RegisterProductContainer>
      <RegisterProductFormContainer
        onSubmit={handleSubmit(handleCreateNewProduct)}
      >
        <RegisterProductFormHeader>
          <Pencil size={32} weight="fill" />
          <h1>Dados do Produto</h1>
        </RegisterProductFormHeader>

        <InputsContainer>
          <div>
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              id="sku"
              placeholder="Digite o SKU do produto"
              maxLength={30}
              {...register('sku')}
            />
            {errors.sku && (
              <ErrorSpan>
                <Warning size={16} weight="fill" />
                {errors.sku.message}
              </ErrorSpan>
            )}
          </div>

          <div>
            <label htmlFor="version">Versão</label>
            <InputVersion>
              <p>v.</p>
              <input
                type="text"
                {...register('month')}
                maxLength={2}
                minLength={2}
              />
              <p>/</p>
              <input
                type="text"
                {...register('year')}
                maxLength={2}
                minLength={2}
              />
            </InputVersion>
          </div>

          <div>
            <label htmlFor="productName">Nome do Produto</label>
            <input
              type="text"
              id="productName"
              placeholder="Digite o nome do produto"
              {...register('productName')}
            />
            {errors.productName && (
              <ErrorSpan>
                <Warning size={16} weight="fill" />
                {errors.productName.message}
              </ErrorSpan>
            )}
          </div>

          <div>
            <label htmlFor="productLine">Linha</label>
            <input
              type="text"
              id="productLine"
              placeholder="Digite o nome da linha do produto"
              {...register('productLine')}
            />
            {errors.productLine && (
              <ErrorSpan>
                <Warning size={16} weight="fill" />
                {errors.productLine.message}
              </ErrorSpan>
            )}
          </div>
        </InputsContainer>

        <MDContainer data-color-mode="light">
          <label htmlFor="composition">Composição</label>
          <Controller
            control={control}
            name="composition"
            render={({ field }) => {
              return (
                <MDEditor
                  height={200}
                  commands={[...commands.getCommands()]}
                  value={field.value}
                  onChange={(event: string) => field.onChange(event)}
                  id="composition"
                />
              )
            }}
          />
        </MDContainer>

        <RegisterProductFormHeader>
          <ImageIcon size={24} weight="fill" />
          <h1>Imagens</h1>
        </RegisterProductFormHeader>

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
                return (
                  <div key={field.id}>
                    <Controller
                      control={control}
                      name={`Stamps.${index}.active`}
                      render={({ field }) => (
                        <CheckboxButton
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
          <span>
            {`As instruções devem ser cadastradas na tela de produtos cadastrados
            no botão "criar nova instrução".`}
          </span>
          {isSubmitting ? (
            <LoadingButton
              statusColor="black"
              statusWidth="complete"
              statusHeight="complete"
            />
          ) : (
            <button type="submit">Criar</button>
          )}
          {isSubmitSuccessful && (
            <Success isOpen={true} message="Produto cadastrado com sucesso!" />
          )}
        </ButtonSubmitDiv>
      </RegisterProductFormContainer>
    </RegisterProductContainer>
  )
}
