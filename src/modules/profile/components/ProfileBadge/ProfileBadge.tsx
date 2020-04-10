import React from 'react'
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire'
import { useHistory } from 'react-router-dom'
import { Collections } from '../../../../services/firebase'
import { User } from '../../../../types/User'
import { ProfileBadgeView } from './ProfileBadgeView'

export default function ProfileBadge({ id }: { id: string }) {
  const history = useHistory()
  const ref = useFirestore().collection(Collections.USERS).doc(id)
  const { name, avatarUrl, rank }: User = useFirestoreDocDataOnce(ref)

  function handleClick() {
    history.push(`/profile/${id}`)
  }
  return (
    <ProfileBadgeView
      onClick={handleClick}
      avatarUrl={avatarUrl}
      name={name}
      rank={rank}
    />
  )
}
