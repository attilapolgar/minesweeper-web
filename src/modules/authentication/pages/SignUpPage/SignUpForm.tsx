import React, { FormEvent, ReactElement } from 'react'
import { Form, Button, Icon, Message } from 'semantic-ui-react'

import { SignUpFormData } from './useSignUp'

export function SignUpForm({
  onSubmit,
  error,
  data,
  onChange,
  loading,
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  error: string
  loading: boolean
  onChange: (event: FormEvent<HTMLInputElement>) => void
  data: SignUpFormData
}): ReactElement {
  return (
    <Form onSubmit={onSubmit} error={!!error} loading={loading}>
      <Form.Input
        required
        label="Display name"
        value={data.name}
        name="name"
        placeholder="display name"
        onChange={onChange}
      />

      <Form.Input
        required
        label="Email"
        type="email"
        name="email"
        value={data.email}
        placeholder="email address"
        onChange={onChange}
      />

      <Form.Input
        required
        label="Password"
        type="password"
        name="password"
        value={data.password}
        placeholder="password"
        onChange={onChange}
      />

      <Message error header="Ooopsz" content={error} />

      <Button primary animated="vertical" type="submit" fluid>
        <Button.Content visible>Sign up</Button.Content>
        <Button.Content hidden>
          <Icon name="signup" />
        </Button.Content>
      </Button>
    </Form>
  )
}
