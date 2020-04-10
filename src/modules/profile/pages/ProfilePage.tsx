import React, { ReactElement } from 'react'
import { Grid, Divider, Header } from 'semantic-ui-react'
import { useUser, useFirestore, useFirestoreCollectionData } from 'reactfire'

import ProfileCard from '../components/ProfileCard'
import { FirebaseUser } from '../../../types/User'
import { Collections } from '../../../services/firebase'
import { Match, MatchStatus } from '../../../types/Match'
import MatchPreviewList from '../../game/components/MatchPreviewList'

export default function ProfilePage(): ReactElement | null {
  const user = useUser<FirebaseUser>()
  const matchesRef = useFirestore().collection(Collections.MATCHES)
  const myMatchesRef = matchesRef.where('players', 'array-contains', user.uid)

  const waiting = myMatchesRef.where('status', '==', MatchStatus.WAITING)
  const started = myMatchesRef.where('status', '==', MatchStatus.STARTED)
  const ready = myMatchesRef.where('status', '==', MatchStatus.READY_TO_START)

  const waitingMatches: Match[] = useFirestoreCollectionData(waiting, {
    idField: 'id',
  })
  const startedMatches: Match[] = useFirestoreCollectionData(started, {
    idField: 'id',
  })
  const readyMatches: Match[] = useFirestoreCollectionData(ready, {
    idField: 'id',
  })

  return (
    <Grid centered>
      <Grid.Row columns={2}>
        <Grid.Column width={5}>
          <ProfileCard id={user.uid} editable />
        </Grid.Column>
        <Grid.Column width={11}>
          <Header>Started</Header>
          <MatchPreviewList matches={startedMatches} />
          <Divider />

          <Header>Ready</Header>
          <MatchPreviewList matches={readyMatches} />
          <Divider />

          <Header>Waiting</Header>
          <MatchPreviewList matches={waitingMatches} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
