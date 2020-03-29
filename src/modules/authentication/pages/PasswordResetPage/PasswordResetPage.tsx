import React, { ReactElement } from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'

import { Footer } from './Footer'
import { PasswordResetForm } from './PasswordResetForm'
import { usePasswordReset } from './usePasswordReset'

export default function PasswordResetPage(): ReactElement {
  const {
    loading,
    email,
    error,
    emailHasBeenSent,
    sendPasswordResetEmail,
    onEmailChange,
  } = usePasswordReset()
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }} textAlign="left">
        <Header as="h2" color="grey" textAlign="center">
          Reset your password
        </Header>
        <Segment stacked>
          <PasswordResetForm
            email={email}
            emailHasBeenSent={emailHasBeenSent}
            error={error}
            loading={loading}
            onChange={onEmailChange}
            onSubmit={sendPasswordResetEmail}
          />
        </Segment>
        <Footer />
      </Grid.Column>
    </Grid>
  )
}
