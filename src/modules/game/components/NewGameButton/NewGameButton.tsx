import React, { ReactElement } from 'react'
import { useFirestore, useUser } from 'reactfire'
import { Collections } from '../../../../services/firebase'
import { User, firestore } from 'firebase'
import { MatchStatus } from '../../../../types/Match'
import { Button, Icon } from 'semantic-ui-react'

export default function NewGameButton(): ReactElement {
  const matchRef = useFirestore().collection(Collections.MATCHES)
  const user = useUser<User>()

  function handleNewGamePressed(): void {
    matchRef.add({
      players: [user.uid],
      owner: user.uid,
      status: MatchStatus.WAITING,
      created: firestore.FieldValue.serverTimestamp(),
    })
  }

  return (
    <Button onClick={handleNewGamePressed} positive icon labelPosition="right">
      <Icon name="plus" />
      New game
    </Button>
  )
}
