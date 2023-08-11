import { Check, Clipboard } from 'phosphor-react'
import {
  ButtonSubmitDiv,
  CheckboxButton,
  CheckboxContainer,
  CopyProductContainer,
  CopyProductContent,
  FormCopyProduct,
  FormCopyProductCardProduct,
  FormCopyProductContainer,
  FormCopyProductContent,
  FormCopyProductInputs,
  InputVersion,
  MDContainer,
} from './styles'
import { CardProduct } from '../../../components/CardProduct'
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Product, ProductsContext } from '../../../context/ProductContext'

import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import * as Checkbox from '@radix-ui/react-checkbox'
import MDEditor, { commands } from '@uiw/react-md-editor'
import { LoadingButton } from '../../../components/LoadingButton'
import { Success } from '../../../components/Success'

interface ParamsProps {
  idProduct: string
}

const copyProductSchema = z.object({
  month: z.string().nonempty('O campo de mês não pode estar vazio'),
  year: z.string().nonempty('O campo de ano não pode estar vazio'),
  composition: z.string(),
  copyInstruction: z.boolean(),
})

type copyProductFormInputs = z.infer<typeof copyProductSchema>

export function CopyProducts() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm<copyProductFormInputs>({
    resolver: zodResolver(copyProductSchema),
  })

  const { idProduct } = useParams() as unknown as ParamsProps

  const { findProductByID, copyNewProduct } = useContext(ProductsContext)

  const [product, setProduct] = useState<Product>()
  const [checked, setChecked] = useState<boolean>(false)

  function handleCheckCheckbox() {
    if (checked) {
      setChecked(false)
    } else {
      setChecked(true)
    }
  }

  async function getProductData() {
    if (idProduct) {
      const ProductData = await findProductByID(idProduct, 'Registred')

      if (ProductData) {
        setProduct(ProductData)
      }
    }
  }

  useEffect(() => {
    getProductData()
  }, [])

  async function handleCopyProduct(data: copyProductFormInputs) {
    const newVersion = `v.${data.month}/${data.year}`

    const copyProduct = {
      idProduct,
      newVersion,
      composition: data.composition,
      copyInstruction: data.copyInstruction,
    }

    copyNewProduct(copyProduct)
  }

  return (
    <CopyProductContainer>
      <CopyProductContent>
        <header>
          <h1>
            <Clipboard size={32} weight="fill" />
            Copiar Produto
          </h1>

          <span>
            Crie a cópia exata do produto selecionando ou não as instruções!
          </span>
        </header>

        <FormCopyProduct onSubmit={handleSubmit(handleCopyProduct)}>
          <FormCopyProductContainer>
            <FormCopyProductCardProduct>
              {product && (
                <>
                  <CardProduct productData={product} />
                </>
              )}
            </FormCopyProductCardProduct>
            <FormCopyProductContent>
              <FormCopyProductInputs>
                <div>
                  <label htmlFor="version">Nova Versão</label>
                  <InputVersion>
                    <p>v.</p>
                    <input
                      type="text"
                      maxLength={2}
                      minLength={2}
                      {...register('month')}
                    />
                    <p>/</p>
                    <input
                      type="text"
                      maxLength={2}
                      minLength={2}
                      {...register('year')}
                    />
                  </InputVersion>
                </div>
                <CheckboxContainer>
                  <CheckboxButton
                    id="active"
                    checked={checked}
                    onClick={handleCheckCheckbox}
                    {...register('copyInstruction', { value: checked })}
                  >
                    <Checkbox.Indicator>
                      {checked && <Check fill="bold" />}
                    </Checkbox.Indicator>
                  </CheckboxButton>
                  <label htmlFor="active">
                    Marque para realizar uma cópia das instruções da versão
                    anterior!
                  </label>
                </CheckboxContainer>
              </FormCopyProductInputs>
              <MDContainer data-color-mode="light">
                <label htmlFor="composition">Composição</label>
                <Controller
                  control={control}
                  name="composition"
                  render={({ field }) => {
                    return (
                      <MDEditor
                        height={360}
                        commands={[...commands.getCommands()]}
                        value={field.value}
                        onChange={(event: string) => field.onChange(event)}
                        id="composition"
                      />
                    )
                  }}
                />
              </MDContainer>
            </FormCopyProductContent>
          </FormCopyProductContainer>
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
              <Success
                isOpen={true}
                message="Produto cadastrado com sucesso!"
              />
            )}
          </ButtonSubmitDiv>
        </FormCopyProduct>
      </CopyProductContent>
    </CopyProductContainer>
  )
}
