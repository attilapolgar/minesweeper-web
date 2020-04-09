import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import Match from '../components/Match'

export default function MatchPage(): ReactElement {
  const { matchId } = useParams()

  if (!matchId) {
    return <div>no id</div>
  }

  return (
    <div>
      <Match id={matchId} />
    </div>
  )
}
