import React, { useState } from 'react'
import {
  SuspenseWithPerf,
  useFirestore,
  useFirestoreDocData,
  useUser,
  useFirebaseApp,
} from 'reactfire'
import { Card, Image, Button } from 'semantic-ui-react'
import { Collections, Functions } from '../../../../services/firebase'
import { User } from '../../../../types/User'
import {
  Match,
  MatchPlayer as MatchPlayerType,
  MatchPlayerStatus,
} from '../../../../types/Match'

type Props = {
  player: MatchPlayerType
  match: Match
}

export function MatchPlayerComponent({ player, match }: Props) {
  const { uid } = useUser()
  const [pending, setPending] = useState(false)
  const readyForMatch = useFirebaseApp()
    .functions('europe-west3')
    .httpsCallable(Functions.READY_FOR_MATCH)

  const userDetailsRef = useFirestore()
    .collection(Collections.USERS)
    .doc(player.userId)

  const user: User = useFirestoreDocData(userDetailsRef)
  async function handleReadyForMatch() {
    try {
      setPending(true)
      await readyForMatch({ matchId: match.id })
    } catch (error) {
      console.log('error', error)
    } finally {
      setPending(false)
    }
  }

  const isMe = uid === player.userId
  const isPlayersTurn = player.userId === match.activePlayer

  return (
    <Card style={{ textAlign: 'left' }} color={player.color}>
      <Image src={user.avatarUrl} />
      <Card.Content>
        <Card.Header style={{ textAlign: 'center' }}>{`${user.name}${
          isPlayersTurn ? "'s turn" : ''
        }`}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Header style={{ textAlign: 'center' }}>
          {player.status === MatchPlayerStatus.JOINED && isMe && (
            <Button primary onClick={handleReadyForMatch} loading={pending}>
              Ready
            </Button>
          )}

          {player.status === MatchPlayerStatus.JOINED && !isMe && 'Joined'}
          {player.status === MatchPlayerStatus.READY && player.score}
        </Card.Header>
      </Card.Content>
    </Card>
  )
}

export default function MatchPlayer({ player, match }: Props) {
  return (
    <SuspenseWithPerf fallback="loading" traceId="match_player_load">
      <MatchPlayerComponent player={player} match={match} />
    </SuspenseWithPerf>
  )
}
