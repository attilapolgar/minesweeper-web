import React, { ReactElement } from 'react'
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire'
import { Collections } from '../../../../../services/firebase'
import { User } from '../../../../../types/User'
import { Label } from 'semantic-ui-react'

export default function ProfileBadge({
  id,
  owner,
}: {
  id: string
  owner: boolean
}): ReactElement {
  const ref = useFirestore().collection(Collections.USERS).doc(id)
  const { name = 'Anonymous', avatarUrl }: User = useFirestoreDocDataOnce(ref)
  return (
    <Label image style={{ cursor: 'default' }}>
      {avatarUrl && <img src={avatarUrl} alt="avatar" />}
      {name}
      {owner ? (
        <Label.Detail>started</Label.Detail>
      ) : (
        <Label.Detail>accepted</Label.Detail>
      )}
    </Label>
  )
}
