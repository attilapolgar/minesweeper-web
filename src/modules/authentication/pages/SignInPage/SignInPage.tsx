import React, { ReactElement } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { uiConfig } from '../../config'
import { auth } from '../../../../services/firebase'
import { Grid } from 'semantic-ui-react'

export default function SignInPage(): ReactElement {
  return (
    <Grid centered>
      <Grid.Column>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      </Grid.Column>
    </Grid>
  )
}
