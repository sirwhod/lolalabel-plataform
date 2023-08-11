import { CircleNotch } from 'phosphor-react'

import { LoadingButtonStyled } from './styled'

interface LoadingButtonProps {
  statusColor: 'red' | 'black'
  statusWidth: 'complete' | 'search'
  statusHeight: 'complete' | 'search'
}

export function LoadingButton({
  statusColor,
  statusWidth,
  statusHeight,
}: LoadingButtonProps) {
  return (
    <LoadingButtonStyled
      statusColor={statusColor}
      statusWidth={statusWidth}
      statusHeight={statusHeight}
      disabled
    >
      <CircleNotch size={24} weight="bold" />
    </LoadingButtonStyled>
  )
}
