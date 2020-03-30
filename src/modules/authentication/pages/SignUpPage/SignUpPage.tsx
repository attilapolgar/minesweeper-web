import React, { ReactElement } from 'react'
import { Grid, Segment, Header } from 'semantic-ui-react'
import { Footer } from './Footer'
import { GoogleSignUpButton } from './GoogleSignUpButton'
import { SignUpForm } from './Form'
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
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }} textAlign="left">
        <Header as="h2" color="grey" textAlign="center">
          Register a new account
        </Header>
        <Segment stacked>
          <SignUpForm
            data={formData}
            error={error}
            loading={loading}
            onChange={onInputChange}
            onSubmit={signUpWithEmailAndPassword}
          />
          <Header textAlign="center" as="h4">
            or
          </Header>{' '}
          <GoogleSignUpButton />
        </Segment>
        <Footer />
      </Grid.Column>
    </Grid>
  )
}
