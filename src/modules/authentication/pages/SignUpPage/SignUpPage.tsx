import React, { ReactElement, useState } from 'react'
import { Card, Grid } from 'semantic-ui-react'
import { Footer } from './Footer'
import { GoogleSignUpButton } from './GoogleSignUpButton'
import { SignUpForm } from './SignUpForm'
import useSignUp from './useSignUp'

export default function SignUpPage(): ReactElement {
  const {
    error,
    formData,
    loading,
    onInputChange,
    signUpWithEmailAndPassword,
  } = useSignUp()

  return (
    <Grid centered>
      <Card>
        <Card.Content>
          <SignUpForm
            data={formData}
            error={error}
            loading={loading}
            onChange={onInputChange}
            onSubmit={signUpWithEmailAndPassword}
          />
          <p>or</p>
          <GoogleSignUpButton />
          <Footer />
        </Card.Content>
      </Card>
    </Grid>
  )
}
