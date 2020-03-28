import React, { ReactElement } from 'react'
import { Button, Icon } from 'semantic-ui-react'

export function GoogleLoginButton({
  onPress,
}: {
  onPress: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}): ReactElement {
  return (
    <Button color="google plus" fluid onClick={onPress} animated="fade">
      <Button.Content visible>
        <Icon name="google" />
      </Button.Content>
      <Button.Content hidden>Sign in with Google</Button.Content>
    </Button>
  )
}
