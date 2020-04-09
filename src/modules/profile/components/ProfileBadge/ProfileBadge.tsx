import React, { ReactElement } from 'react'
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire'
import { Label } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { Collections } from '../../../../services/firebase'
import { User } from '../../../../types/User'

export default function ProfileBadge({
  id,
  owner,
}: {
  id: string
  owner: boolean
}): ReactElement {
  const history = useHistory()
  const ref = useFirestore().collection(Collections.USERS).doc(id)
  const { name = 'Guest', avatarUrl }: User = useFirestoreDocDataOnce(ref)

  function handleClick() {
    history.push(`/profile/${id}`)
  }
  return (
    <Label as="a" image onClick={handleClick}>
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
