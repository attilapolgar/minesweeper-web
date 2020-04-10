import React, { ReactElement, useState } from 'react'
import { useFunctions } from 'reactfire'
import { Button, Icon } from 'semantic-ui-react'

import { Functions } from '../../../../services/firebase'

export default function NewGameButton(): ReactElement {
  const createMatch = useFunctions().httpsCallable(Functions.CREATE_MATCH)
  const [pending, setPending] = useState(false)

  async function handleNewGamePressed() {
    try {
      setPending(true)
      await createMatch()
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
      New game
    </Button>
  )
}
