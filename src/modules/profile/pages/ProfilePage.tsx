import React, { ReactElement } from 'react'
import { Grid } from 'semantic-ui-react'
import { useUser, useFirestore, useFirestoreCollectionData } from 'reactfire'

import ProfileCard from '../components/ProfileCard'
import { FirebaseUser } from '../../../types/User'
import { Collections } from '../../../services/firebase'
import { Match } from '../../../types/Match'
import MatchPreviewList from '../../game/components/MatchPreviewList'

export default function ProfilePage(): ReactElement | null {
  const user = useUser<FirebaseUser>()
  const matchesRef = useFirestore().collection(Collections.MATCHES)
  const queryRef = matchesRef.where('players', 'array-contains', user.uid)

  const matches: Match[] = useFirestoreCollectionData(queryRef, {
    idField: 'id',
  })
  return (
    <Grid centered>
      <Grid.Row columns={2}>
        <Grid.Column width={5}>
          <ProfileCard id={user.uid} editable={!user.isAnonymous} />
        </Grid.Column>
        <Grid.Column width={11}>
          <MatchPreviewList matches={matches} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
