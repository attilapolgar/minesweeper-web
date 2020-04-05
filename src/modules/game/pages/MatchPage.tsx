import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import Match from '../components/Match'

export default function MatchPage(): ReactElement {
  const { id } = useParams()

  if (!id) {
    return <div>no id</div>
  }

  return (
    <div>
      <Match id={id} />
    </div>
  )
}
