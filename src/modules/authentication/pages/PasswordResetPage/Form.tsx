import React, { ReactElement, FormEvent } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'

export function PasswordResetForm({
  onSubmit,
  error,
  loading,
  emailHasBeenSent,
  email,
  onChange,
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  error: string
  loading: boolean
  onChange: (event: FormEvent<HTMLInputElement>) => void
  email: string
  emailHasBeenSent: boolean
}): ReactElement {
  return (
    <Form
      onSubmit={onSubmit}
      error={!!error}
      loading={loading}
      success={emailHasBeenSent}
    >
      <Form.Input
        required
        placeholder="email address"
        label="email address"
        type="email"
        value={email}
        onChange={onChange}
      />

      <Message error header="Ooops" content={error} />
      <Message success content="An email has been sent to you!" />

      <Button primary type="submit" fluid>
        Send me a reset link
      </Button>
    </Form>
  )
}
