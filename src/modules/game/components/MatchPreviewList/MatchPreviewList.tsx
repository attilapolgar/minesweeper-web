import React, { ReactElement } from 'react'
import { Match } from '../../../../types/Match'
import { Grid } from 'semantic-ui-react'
import MatchPreview from '../MatchPreview/MatchPreview'

export default function MatchPreviewList({
  matches,
}: {
  matches: Match[]
}): ReactElement {
  return (
    <Grid columns={3}>
      <Grid.Row>
        {matches.map((match) => (
          <Grid.Column key={match.id}>
            <MatchPreview id={match.id} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  )
}
