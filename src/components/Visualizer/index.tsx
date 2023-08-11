import {
  AccordionContent,
  AccordionTrigger,
  ContainderLanguage,
  ContainerInstruction,
  EmptyInstruction,
  VisualizerProductContainer,
} from './styled'
import MDEditor from '@uiw/react-md-editor'
import * as Accordion from '@radix-ui/react-accordion'
import { DockValidation } from './components/DockValidation'
import { useContext, useEffect, useState } from 'react'
import {
  ProductValidation,
  ProductsContext,
} from '../../context/ProductContext'
import { useParams } from 'react-router-dom'
import { CardProduct } from '../CardProduct'
import { CaretDown, MagnifyingGlass } from 'phosphor-react'

import { US, BR, ES, DE, RU, FR } from 'country-flag-icons/react/3x2'

export function VisualizerProduct() {
  const { idProduct } = useParams<string>()
  const [product, setProduct] = useState<ProductValidation>()
  const { fetchProductByID } = useContext(ProductsContext)

  async function getProductByID() {
    if (idProduct) {
      const response = await fetchProductByID(idProduct)
      setProduct(response)
    }
  }

  useEffect(() => {
    getProductByID()
  }, [])

  if (product) {
    const { Instructions, ...productRest } = product

    const productData = {
      Instructions: [],
      ...productRest,
    }

    return (
      <VisualizerProductContainer>
        <div>
          <CardProduct productData={productData} />
        </div>

        <div></div>

        <ContainerInstruction>
          {Instructions.length > 0 ? (
            <>
              <ContainderLanguage>
                <h1>Saiba Mais!</h1>
                <span>
                  Veja abaixo todas as informações do Produto, em sua respectiva
                  linguagem!
                </span>
                <Accordion.Root type="single" collapsible>
                  {Instructions.map((instruction) => {
                    return (
                      <Accordion.Item
                        value={instruction.language}
                        key={instruction.id}
                      >
                        <AccordionTrigger>
                          {instruction.language === 'Português' ? (
                            <>
                              <BR />
                              {instruction.language}
                            </>
                          ) : instruction.language === 'Inglês' ? (
                            <>
                              <US />
                              {instruction.language}
                            </>
                          ) : instruction.language === 'Espanhol' ? (
                            <>
                              <ES />
                              {instruction.language}
                            </>
                          ) : instruction.language === 'Alemão' ? (
                            <>
                              <DE />
                              {instruction.language}
                            </>
                          ) : instruction.language === 'Russo' ? (
                            <>
                              <RU />
                              {instruction.language}
                            </>
                          ) : (
                            instruction.language === 'Francês' && (
                              <>
                                <FR />
                                {instruction.language}
                              </>
                            )
                          )}
                          <CaretDown size={24} weight="bold" />
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="container" data-color-mode="light">
                            <MDEditor.Markdown source={instruction.whatIAm} />
                          </div>
                          <div className="container" data-color-mode="light">
                            <MDEditor.Markdown source={instruction.modeOfUse} />
                          </div>
                          <div className="container" data-color-mode="light">
                            <MDEditor.Markdown
                              source={instruction.Precaution}
                            />
                          </div>
                        </AccordionContent>
                      </Accordion.Item>
                    )
                  })}
                </Accordion.Root>
              </ContainderLanguage>
            </>
          ) : (
            <EmptyInstruction>
              <MagnifyingGlass size={128} weight="fill" />
              <span>Nenhuma instrução ativa para este produto</span>
            </EmptyInstruction>
          )}
        </ContainerInstruction>

        <DockValidation productData={productData} />
      </VisualizerProductContainer>
    )
  }
}
