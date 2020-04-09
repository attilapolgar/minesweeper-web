import React, { ReactElement } from 'react'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { Collections } from '../../../services/firebase'
import { Match, MatchStatus } from '../../../types/Match'
import MatchPreviewList from '../../game/components/MatchPreviewList'

export default function LobbyPage(): ReactElement {
  const matchesRef = useFirestore()
    .collection(Collections.MATCHES)
    .where('status', '==', MatchStatus.WAITING)
  const data: Match[] = useFirestoreCollectionData(matchesRef, {
    idField: 'id',
  })

  return <MatchPreviewList matches={data} />
}
