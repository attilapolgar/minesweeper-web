import React from 'react'
import { Label } from 'semantic-ui-react'

type UIProps = {
  onClick?: (event: React.MouseEvent) => void
  avatarUrl: string
  rank?: string
  name: string
}

export function ProfileBadgeView({
  avatarUrl,
  rank,
  name,
  onClick = () => null,
}: UIProps) {
  return (
    <Label as="a" image onClick={onClick}>
      {avatarUrl && <img src={avatarUrl} alt="avatar" />}
      {name}
      {rank && <Label.Detail>{rank}</Label.Detail>}
    </Label>
  )
}
