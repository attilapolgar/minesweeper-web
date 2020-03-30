import React, { ReactElement } from 'react'
import { Button, Icon } from 'semantic-ui-react'

export function GoogleSignUpButton(): ReactElement {
  return (
    <Button icon labelPosition="left" color="google plus" fluid>
      <Icon name="google" />
      Sign up with Google
    </Button>
  )
}
