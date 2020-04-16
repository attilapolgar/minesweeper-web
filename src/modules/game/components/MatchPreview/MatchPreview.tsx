import React, { ReactElement, useState } from 'react'
import {
  Card,
  Placeholder,
  Image,
  Label,
  Button,
  Icon,
} from 'semantic-ui-react'
import { formatDistanceToNow } from 'date-fns'
import {
  useFirestore,
  SuspenseWithPerf,
  useUser,
  useFirestoreDocData,
  useFirebaseApp,
} from 'reactfire'

import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic'
import { useHistory } from 'react-router-dom'
import { Collections, Functions } from '../../../../services/firebase'
import { Match, MatchStatus } from '../../../../types/Match'
import ProfileBadge from '../../../profile/components/ProfileBadge'
import headerImage from './header-image.png'

type Props = {
  id: string
}

function MatchPreviewComponent({ id }: Props): ReactElement {
  const { uid } = useUser()
  const history = useHistory()
  const [pending, setPending] = useState(false)
  const joinMatch = useFirebaseApp()
    .functions('europe-west3')
    .httpsCallable(Functions.JOIN_MATCH)

  const matchRef = useFirestore().collection(Collections.MATCHES).doc(id)
  const match: Match = useFirestoreDocData(matchRef, { idField: 'id' })
  const imPlaying = match.playerIds.includes(uid)

  async function handleAcceptGame() {
    try {
      setPending(true)
      await joinMatch({ matchId: id })
      history.push(`/match/${match.id}`)
    } catch (error) {
      console.log('error', error)
    } finally {
      setPending(false)
    }
  }

  function handleGoTomatch() {
    history.push(`/match/${match.id}`)
  }

  const matchStartFromNow =
    match.createdAt && formatDistanceToNow(match.createdAt.toDate())

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
          {match.players.map(({ userId }) => (
            <ProfileBadge id={userId} key={userId} />
          ))}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        {match.status === MatchStatus.WAITING &&
          (imPlaying ? (
            <Button onClick={handleGoTomatch} positive fluid>
              Go to match
            </Button>
          ) : (
            <Button onClick={handleAcceptGame} fluid loading={pending}>
              <Icon name="play" />
              Join match
            </Button>
          ))}

        {(match.status === MatchStatus.READY_TO_START ||
          match.status === MatchStatus.STARTED) &&
          imPlaying && (
            <Button onClick={handleGoTomatch} positive fluid>
              Go to match
            </Button>
          )}
      </Card.Content>
      {!!matchStartFromNow && (
        <Card.Content>
          <Label attached="bottom">Started {matchStartFromNow} ago</Label>
        </Card.Content>
      )}
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
