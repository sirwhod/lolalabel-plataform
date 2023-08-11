import { CheckCircle, X } from 'phosphor-react'
import { CloseButton, CloseButtonX, Content, Overlay, Title } from './styled'
import * as Dialog from '@radix-ui/react-dialog'

interface ModalSuccessProps {
  isOpen: boolean
  message?: string
}

export function Success({ isOpen, message }: ModalSuccessProps) {
  return (
    <Dialog.Root defaultOpen={isOpen}>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Title>
            <CheckCircle size={32} weight="fill" />
            Sucesso!
          </Title>

          {message && <span>{message}</span>}

          <CloseButtonX asChild>
            <X size={16} weight="bold" />
          </CloseButtonX>
          <CloseButton asChild>
            <button>Concluir!</button>
          </CloseButton>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
