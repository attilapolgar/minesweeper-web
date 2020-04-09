import React, { ReactElement } from 'react'
import { useFirestore, useUser, useFirestoreCollectionData } from 'reactfire'
import { Collections } from '../../../services/firebase'
import { Match } from '../../../types/Match'
import MatchPreviewList from '../components/MatchPreviewList'

export default function MatchesPage(): ReactElement | null {
  const { uid } = useUser()
  const matchesRef = useFirestore().collection(Collections.MATCHES)
  const queryRef = matchesRef.where('players', 'array-contains', uid)

  const matches: Match[] = useFirestoreCollectionData(queryRef, {
    idField: 'id',
  })

  return (
    <div>
      <MatchPreviewList matches={matches} />
    </div>
  )
}
