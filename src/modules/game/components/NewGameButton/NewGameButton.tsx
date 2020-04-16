import React, { ReactElement, useState } from 'react'
import { useFirebaseApp } from 'reactfire'
import { Button, Icon } from 'semantic-ui-react'

import { Functions } from '../../../../services/firebase'

export default function NewGameButton(): ReactElement {
  const createMatch = useFirebaseApp()
    .functions('europe-west3')
    .httpsCallable(Functions.CREATE_MATCH)
  const [pending, setPending] = useState(false)

  async function handleNewGamePressed() {
    try {
      setPending(true)
      const match = await createMatch()
      console.log('match', match)
    } catch (error) {
      console.log('error', error)
    } finally {
      setPending(false)
    }
  }

  return (
    <Button
      onClick={handleNewGamePressed}
      positive
      icon
      labelPosition="right"
      loading={pending}
    >
      <Icon name="plus" />
      New match
    </Button>
  )
}
