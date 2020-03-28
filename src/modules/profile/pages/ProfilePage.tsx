import React, { ReactElement, useContext } from 'react'
import { UserContext } from '../../../providers/UserProvider'
import { auth } from '../../../firebase'
import { Button } from 'semantic-ui-react'

export default function ProfilePage(): ReactElement | null {
  const user = useContext(UserContext)

  if (!user) {
    return null
  }

  const { displayName, email } = user

  return (
    <div>
      <h2>ProfilePage</h2>
      <div>{displayName}</div>
      <div>{email}</div>

      <Button
        onClick={(): void => {
          auth.signOut()
        }}
      >
        Sign out
      </Button>
    </div>
  )
}
