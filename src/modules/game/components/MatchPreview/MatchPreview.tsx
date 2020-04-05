import React, { ReactElement } from 'react'
import { Card, Placeholder, Segment } from 'semantic-ui-react'
import { Collections } from '../../../../services/firebase'
import { useFirestore, useFirestoreDocData, SuspenseWithPerf } from 'reactfire'

type Props = {
  id: string
}

function MatchPreviewComponent({ id }: Props): ReactElement {
  const matchRef = useFirestore().collection(Collections.MATCHES).doc(id)
  const match = useFirestoreDocData(matchRef)

  return (
    <Card>
      <Card.Content>
        {JSON.stringify(match, null, 2)}
        <Card.Meta>Waiting for opponent</Card.Meta>
      </Card.Content>
    </Card>
  )
}

export default function MatchPreview({ id }: Props): ReactElement {
  return (
    <SuspenseWithPerf fallback={<Fallback />} traceId="match_preview_load">
      <MatchPreviewComponent id={id} />
    </SuspenseWithPerf>
  )
}

function Fallback(): ReactElement {
  return (
    <Card>
      <Card.Content>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="short" />
          </Placeholder.Paragraph>
        </Placeholder>
      </Card.Content>
    </Card>
  )
}
