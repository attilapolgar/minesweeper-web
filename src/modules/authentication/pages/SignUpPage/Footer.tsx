import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { AuthenticationRoutes } from '../../authentication.routes'
import { Message, Grid } from 'semantic-ui-react'

export function Footer(): ReactElement {
  return (
    <Grid>
      <Grid.Column textAlign="center">
        <Message>
          <p>
            Already have an account?{' '}
            <Link to={AuthenticationRoutes.SIGNIN}>Sign in here</Link>
          </p>
        </Message>
      </Grid.Column>
    </Grid>
  )
}
