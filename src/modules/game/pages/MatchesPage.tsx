import React, { ReactElement, useEffect, useState } from 'react'
import { useFirestore, useUser, SuspenseWithPerf } from 'reactfire'
import { Collections } from '../../../services/firebase'
import { Match as MatchType } from '../../../types/Match'
import { useHistory } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import MatchPreview from '../components/MatchPreview'

export default function MatchesPage(): ReactElement | null {
  const { uid } = useUser()
  const history = useHistory()
  const matchesRef = useFirestore().collection(Collections.MATCHES)

  const [matches, setMatches] = useState<MatchType[] | null>(null)

  useEffect(() => {
    async function getMatches(): Promise<void> {
      const queryRef = matchesRef.where('players', 'array-contains', uid)

      const snapshot = await queryRef.get()
      const myMatches: MatchType[] = []
      snapshot.forEach((doc) => {
        const matchData = doc.data()
        myMatches.push({
          players: matchData.players,
          owner: matchData.owner,
          id: doc.id,
          status: matchData.status,
        })
      })
      setMatches(myMatches)
    }

    getMatches()
  }, [])

  if (!matches || !matches.length) {
    return <div>you don't have any matches yet</div>
  }

  const myMatches = matches.filter((match) => match.owner === uid)
  const acceptedMatches = matches.filter((match) => match.owner !== uid)

  return (
    <div>
      <h3>I started</h3>
      {myMatches.map((match) => (
        <SuspenseWithPerf
          fallback="lll"
          traceId="match_preview_load"
          key={match.id}
        >
          <MatchPreview id={match.id} />
        </SuspenseWithPerf>
      ))}
      <h3>Accepted</h3>
      {acceptedMatches.map((match) => (
        <MatchPreview id={match.id} key={match.id} />
      ))}
    </div>
  )
}
