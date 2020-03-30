import React, { ReactElement } from 'react'
import { Icon, Message, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export function Footer(): ReactElement {
  return (
    <Grid>
      <Grid.Column textAlign="center">
        <Message>
          <Link to="/">
            <Icon name="arrow left" />
            back to sign in page
          </Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}
