import React, { ReactElement, FormEvent } from 'react'

import { Form, Message, Button, Icon } from 'semantic-ui-react'
import { SignInFormData } from './useSignIn'

export function LoginForm({
  onSubmit,
  error,
  loading,
  onChange,
  data,
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  error: string
  loading: boolean
  onChange: (event: FormEvent<HTMLInputElement>) => void
  data: SignInFormData
}): ReactElement {
  return (
    <Form onSubmit={onSubmit} error={!!error} loading={loading}>
      <Form.Input
        required
        label="Email"
        type="email"
        name="email"
        onChange={onChange}
        placeholder="email address"
        value={data.email}
      />

      <Form.Input
        required
        label="Password"
        type="password"
        name="password"
        onChange={onChange}
        placeholder="password"
        value={data.password}
      />

      <Message error header="Ooopsz" content={error} />

      <SignInButton />
    </Form>
  )
}

const SignInButton = (): ReactElement => (
  <Button primary animated="vertical" type="submit" fluid>
    <Button.Content visible>Sign in</Button.Content>
    <Button.Content hidden>
      <Icon name="arrow right" />
    </Button.Content>
  </Button>
)
