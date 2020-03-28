import React, { ReactElement } from 'react'

import { Card, Grid } from 'semantic-ui-react'
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
    <Grid centered>
      <Card>
        <Card.Content>
          <LoginForm
            data={formData}
            onSubmit={signInWithEmailAndPassword}
            onChange={onInputChange}
            error={error}
            loading={loading}
          />
          <p>or</p>
          <GoogleLoginButton onPress={signInWithGoogle} />
          <Footer />
        </Card.Content>
      </Card>
    </Grid>
  )
}
