import { InstructionContainer, LanguagesIntructionsContainer } from './styled'

import MDEditor from '@uiw/react-md-editor'
import { ReactNode } from 'react'
import { CardProduct } from '../../../../components/CardProduct'
import { Instruction } from '../../../../context/InstructionsContext'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { US, BR, ES, DE, RU, FR } from 'country-flag-icons/react/3x2'

interface Stamp {
  id?: string
  nameStamp: string
  image: string
  active: boolean
}

interface productDataProps {
  id: string
  sku: string
  version: string
  productName: string
  productLine: string
  productImage: string
  composition: string
  authorId: string
  creationDate: Date
  isActive: boolean
  isValidated: boolean
  qrCodeIsActive: boolean
  Stamps: Stamp[]
}

interface InstructionComponentProps {
  children: ReactNode
  productData: productDataProps
  instructionData: Instruction
}

export function InstructionComponent({
  children,
  productData,
  instructionData,
}: InstructionComponentProps) {
  const newProductData = {
    ...productData,
    whoCreated: instructionData.whoCreated,
    Instructions: [],
    ProductsDisabled: [],
  }

  return (
    <InstructionContainer>
      <div>
        <CardProduct productData={newProductData} />
      </div>
      <LanguagesIntructionsContainer>
        <h1>
          {instructionData.language === 'Português' ? (
            <>
              <BR />
              {instructionData.language}
            </>
          ) : instructionData.language === 'Inglês' ? (
            <>
              <US />
              {instructionData.language}
            </>
          ) : instructionData.language === 'Espanhol' ? (
            <>
              <ES />
              {instructionData.language}
            </>
          ) : instructionData.language === 'Alemão' ? (
            <>
              <DE />
              {instructionData.language}
            </>
          ) : instructionData.language === 'Russo' ? (
            <>
              <RU />
              {instructionData.language}
            </>
          ) : (
            instructionData.language === 'Francês' && (
              <>
                <FR />
                {instructionData.language}
              </>
            )
          )}
        </h1>
        <div className="container" data-color-mode="light">
          <MDEditor.Markdown source={instructionData.whatIAm} />
        </div>
        <div className="container" data-color-mode="light">
          <MDEditor.Markdown source={instructionData.modeOfUse} />
        </div>
        <div className="container" data-color-mode="light">
          <MDEditor.Markdown source={instructionData.Precaution} />
        </div>
      </LanguagesIntructionsContainer>
      <footer>
        {children}
        <div>
          <span>Criado por:</span>
          <strong>{instructionData.whoCreated.name}</strong>

          <time
            title={format(
              new Date(instructionData.creationDate),
              "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'",
              {
                locale: ptBR,
              },
            )}
          >
            {formatDistanceToNow(new Date(instructionData.creationDate), {
              addSuffix: true,
              locale: ptBR,
            })}
          </time>
        </div>
      </footer>
    </InstructionContainer>
  )
}
