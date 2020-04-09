import React, { ReactElement } from 'react'
import { Grid } from 'semantic-ui-react'
import ProfileCard from '../components/ProfileCard'

export default function ProfilePage(): ReactElement | null {
  return (
    <Grid centered>
      <Grid.Row>
        <ProfileCard />
      </Grid.Row>
    </Grid>
  )
}
