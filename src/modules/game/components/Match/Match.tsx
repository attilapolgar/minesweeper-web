import React, { ReactElement } from 'react'
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire'
import { Button } from 'semantic-ui-react'
import { User } from 'firebase'
import { Match as MatchType } from '../../../../types/Match'

type Props = {
  id: string
}

export default function Match({ id }: Props): ReactElement {
  const me = useUser<User>()
  const matchRef = useFirestore().collection('matches').doc(id)
  const match = useFirestoreDocData<MatchType>(matchRef)

  const { players } = useFirestoreDocData<MatchType>(matchRef)
  function handleAcceptClick(): void {
    matchRef.update({ ...match, players: players.concat([me.uid]) })
  }

  const myGame = players.includes(me.uid)
  return (
    <div>
      <div>{id}</div>
      <div>
        players:{' '}
        {players.map((player) => (
          <div key={player}>{player}</div>
        ))}
      </div>
      <div>
        {players.length === 1 && (
          <div>
            {myGame ? (
              'waiting for the other player...'
            ) : (
              <Button onClick={handleAcceptClick}>accept</Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
