import { auth, signInWithGoogle } from './../../../../firebase'
import { useState, FormEvent } from 'react'

export type SignInFormData = {
  email: string
  password: string
}

type Returns = {
  formData: SignInFormData
  signInWithEmailAndPassword: (
    event: FormEvent<HTMLFormElement>,
  ) => Promise<void>
  onInputChange: (event: FormEvent<HTMLInputElement>) => void
  error: string
  loading: boolean
  signInWithGoogle: () => void
}

export default function useSignIn(): Returns {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  })
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmailAndPassword(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const { email, password } = formData
      await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      const { message = 'Something went wrong' } = error
      setError(message)
      console.error('signInWithEmailAndPassword', error)
    } finally {
      setLoading(false)
    }
  }

  function onInputChange(event: FormEvent<HTMLInputElement>): void {
    const { name, value } = event.currentTarget
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return {
    formData,
    signInWithEmailAndPassword,
    onInputChange,
    error,
    loading,
    signInWithGoogle,
  }
}
