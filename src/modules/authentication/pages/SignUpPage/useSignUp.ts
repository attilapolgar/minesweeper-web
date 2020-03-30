import { auth, generateUserDocument } from './../../../../firebase'
import { FormEvent, useState } from 'react'

const initialFormData = {
  email: '',
  password: '',
  name: '',
}

export type SignUpFormData = {
  email: string
  password: string
  name: string
}

type Returns = {
  formData: SignUpFormData
  signUpWithEmailAndPassword: (
    event: FormEvent<HTMLFormElement>,
  ) => Promise<void>
  onInputChange: (event: FormEvent<HTMLInputElement>) => void
  error: string
  loading: boolean
}
export default function useSignUp(): Returns {
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  async function signUpWithEmailAndPassword(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { email, password, name } = formData
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      )
      if (user) {
        generateUserDocument(user, { name })
      }
    } catch (error) {
      const { message = 'Something went wrong' } = error
      setError(message)
      setFormData(initialFormData)

      console.log('handleCreateUserWithEmailAndPassword', error)
    } finally {
      setLoading(false)
    }
  }

  function onInputChange(event: FormEvent<HTMLInputElement>): void {
    const { name, value } = event.currentTarget
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return { signUpWithEmailAndPassword, onInputChange, formData, error, loading }
}
