import React, { ReactElement } from 'react'

import { Grid, Header, Segment } from 'semantic-ui-react'
import useSignIn from './useSignIn'
import { LoginForm } from './LoginForm'
import { GoogleLoginButton } from './GoogleLoginButton'
import { Footer } from './Footer'

export default function SignInPage(): ReactElement {
  const {
    formData,
    signInWithEmailAndPassword,
    onInputChange,
    error,
    loading,
    signInWithGoogle,
  } = useSignIn()

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }} textAlign="left">
        <Header as="h2" color="grey" textAlign="center">
          Log-in to your account
        </Header>
        <Segment stacked>
          <LoginForm
            data={formData}
            onSubmit={signInWithEmailAndPassword}
            onChange={onInputChange}
            error={error}
            loading={loading}
          />
          <Header textAlign="center" as="h4">
            or
          </Header>
          <GoogleLoginButton onPress={signInWithGoogle} />
        </Segment>
        <Footer />
      </Grid.Column>
    </Grid>
  )
}
