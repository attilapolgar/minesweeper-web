import React, { ReactElement } from 'react'
import { Card, Placeholder, Image, Label, Button } from 'semantic-ui-react'
import { formatDistanceToNow } from 'date-fns'
import {
  useFirestore,
  SuspenseWithPerf,
  useUser,
  useFirestoreDocData,
} from 'reactfire'

import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic'
import { Collections } from '../../../../services/firebase'
import { Match, MatchStatus } from '../../../../types/Match'
import ProfileBadge from '../../../profile/components/ProfileBadge'
import headerImage from './header-image.png'

type Props = {
  id: string
}

function MatchPreviewComponent({ id }: Props): ReactElement {
  const { uid } = useUser()
  const matchRef = useFirestore().collection(Collections.MATCHES).doc(id)
  const match: Match = useFirestoreDocData(matchRef)

  function handleAcceptGame(): void {
    matchRef.set({
      ...match,
      players: match.players.concat([uid]),
      status: MatchStatus.READY_TO_START,
    })
  }

  const matchStartFromNow = match.created
    ? formatDistanceToNow(match.created.toDate())
    : null

  return (
    <Card style={{ marginBottom: 20 }}>
      <Label attached="top" color={getLabelColor(match.status)}>
        {match.status === MatchStatus.WAITING && 'Waiting for opponent...'}
        {match.status === MatchStatus.READY_TO_START && 'Ready to start'}
        {match.status === MatchStatus.STARTED && 'Started'}
      </Label>
      <Card.Content>
        <Image src={headerImage} floated="left" size="tiny" />
        <Card.Header>
          {match.players.map((playerId) => (
            <ProfileBadge
              id={playerId}
              key={playerId}
              owner={match.owner === playerId}
            />
          ))}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        {!!matchStartFromNow && (
          <Label attached="bottom">Started {matchStartFromNow} ago</Label>
        )}

        <Button onClick={handleAcceptGame} positive fluid>
          Let's play!
        </Button>
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

function getLabelColor(status: MatchStatus): SemanticCOLORS {
  if (status === MatchStatus.WAITING) {
    return 'orange'
  }
  if (status === MatchStatus.STARTED) {
    return 'green'
  }
  if (status === MatchStatus.READY_TO_START) {
    return 'yellow'
  }

  return 'grey'
}
