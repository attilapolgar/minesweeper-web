import React, { ReactElement } from 'react'
import { Button, Grid } from 'semantic-ui-react'
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'
import { User } from 'firebase'
import { Collections } from '../../../services/firebase'
import { Match, MatchStatus } from '../../../types/Match'
import MatchPreview from '../../game/components/MatchPreview'

export default function LobbyPage(): ReactElement {
  const matchesRef = useFirestore().collection(Collections.MATCHES)
  const data: Match[] = useFirestoreCollectionData(matchesRef, {
    idField: 'id',
  })

  return (
    <Grid columns={3}>
      <Grid.Row>
        <NewGameButton />
      </Grid.Row>
      <Grid.Row>
        {data.map((match) => (
          <Grid.Column key={match.id}>
            <MatchPreview id={match.id} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  )
}

function NewGameButton(): ReactElement {
  const matchRef = useFirestore().collection(Collections.MATCHES)
  const user = useUser<User>()

  async function handleNewGamePressed(): Promise<void> {
    const { id } = await matchRef.add({
      players: [user.uid],
      owner: user.uid,
      status: MatchStatus.WAITING,
    })
    window.open(`/match/${id}`)
  }

  return <Button onClick={handleNewGamePressed}>new game</Button>
}
