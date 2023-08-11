import { Key, PencilSimple, User } from 'phosphor-react'
import {
  ActionButton,
  ActionButtonsContainer,
  InfoUserContent,
  UserRegistredContainer,
} from './styled'
import * as Dialog from '@radix-ui/react-dialog'
import { User as UserProps } from '../../../../../context/UsersConstext'
import { AlterPassword } from '../../../../../components/AlterPassword'
import { AlterInfoUser } from '../Dialog/AlterInfoUser'

interface UserRegistredProps {
  userData: UserProps
}

export function UserRegistred({ userData }: UserRegistredProps) {
  return (
    <UserRegistredContainer>
      <InfoUserContent>
        <User size={32} weight="fill" />
        <div>
          <strong>{userData.name}</strong>
          <span>{userData.departament}</span>
        </div>
      </InfoUserContent>
      <div>
        <strong>E-mail</strong>
        <span>{userData.username}</span>
      </div>
      <div>
        <strong>Perfil</strong>
        <span>{userData.permission}</span>
      </div>
      <div>
        <strong>Ativo?</strong>
        <span>{userData.active ? 'Sim' : 'Não'}</span>
      </div>
      <ActionButtonsContainer>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButton statusColor="yellow" title="Alterar dados do usuário">
              <PencilSimple size={24} weight="fill" />
            </ActionButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <AlterInfoUser userData={userData} />
          </Dialog.Portal>
        </Dialog.Root>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ActionButton statusColor="purple" title="Alterar senha do usuário">
              <Key size={24} weight="fill" />
            </ActionButton>
          </Dialog.Trigger>
          <Dialog.Portal>
            <AlterPassword page="UsersRegistred" userData={userData} />
          </Dialog.Portal>
        </Dialog.Root>
      </ActionButtonsContainer>
    </UserRegistredContainer>
  )
}
