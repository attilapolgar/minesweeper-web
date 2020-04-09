import React, { ReactElement } from 'react'
import { Grid } from 'semantic-ui-react'
import { useUser } from 'reactfire'

import ProfileCard from '../components/ProfileCard'
import { FirebaseUser } from '../../../types/User'

export default function ProfilePage(): ReactElement | null {
  const user = useUser<FirebaseUser>()

  return (
    <Grid centered>
      <Grid.Row>
        <ProfileCard id={user.uid} editable={!user.isAnonymous} />
      </Grid.Row>
    </Grid>
  )
}
