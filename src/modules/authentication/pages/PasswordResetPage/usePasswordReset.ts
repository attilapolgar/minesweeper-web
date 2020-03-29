import { FormEvent, useState } from 'react'
import { auth } from '../../../../firebase'

type Returns = {
  email: string
  onEmailChange: (event: FormEvent<HTMLInputElement>) => void
  error: string
  loading: boolean
  sendPasswordResetEmail: (event: FormEvent<HTMLFormElement>) => Promise<void>
  emailHasBeenSent: boolean
}

export function usePasswordReset(): Returns {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false)

  function onEmailChange(event: FormEvent<HTMLInputElement>): void {
    const { value } = event.currentTarget
    setEmail(value)
  }

  async function sendPasswordResetEmail(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setError('')
    setEmailHasBeenSent(false)
    setLoading(true)

    try {
      await auth.sendPasswordResetEmail(email)
      setEmailHasBeenSent(true)
    } catch (error) {
      const { message = 'Something went wrong' } = error
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    email,
    error,
    emailHasBeenSent,
    sendPasswordResetEmail,
    onEmailChange,
  }
}
