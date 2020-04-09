import React, { ReactElement } from 'react'
import { Grid } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

import ProfileCard from '../components/ProfileCard'

export default function PublicProfile(): ReactElement {
  const { userId } = useParams()
  return (
    <Grid centered>
      <Grid.Row>
        <ProfileCard id={userId} />
      </Grid.Row>
    </Grid>
  )
}
