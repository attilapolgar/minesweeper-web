import React, { ReactElement, useState, ChangeEvent, useEffect } from 'react'
import {
  useFirestore,
  useFirestoreDocData,
  SuspenseWithPerf,
  useFunctions,
} from 'reactfire'
import {
  Form,
  Button,
  Card,
  Image,
  InputOnChangeData,
  Dimmer,
  Loader,
} from 'semantic-ui-react'
import { formatDistanceToNow } from 'date-fns'

import { Collections, Functions } from '../../../../services/firebase'
import { User } from '../../../../types/User'
import { generateAvatarUrl } from '../../profile.utils'

type Props = { id?: string; editable?: boolean }

function ProfileCardComponent({ id, editable = false }: Props): ReactElement {
  const userDetailsRef = useFirestore().collection(Collections.USERS).doc(id)
  const updateUser = useFunctions().httpsCallable(Functions.UPDATE_USER)

  const user: User = useFirestoreDocData(userDetailsRef)

  const [editMode, setEditMode] = useState(false)
  const [pending, setPending] = useState(false)
  const [localData, setLocalData] = useState(user)

  useEffect(() => {
    setLocalData(user)
  }, [user])

  async function handleSave() {
    try {
      setPending(true)
      await updateUser({
        name: localData.name,
        description: localData.description,
        avatarUrl: generateAvatarUrl(localData.name),
      })
    } catch (error) {
      console.log('error', error)
    } finally {
      setEditMode(false)
      setPending(false)
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement>,
    { name, value }: InputOnChangeData,
  ): void {
    setLocalData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    setLocalData((prev) => ({
      ...prev,
      avatarUrl: generateAvatarUrl(localData.name),
    }))
  }, [localData.name])

  function handleEdit(): void {
    setEditMode(true)
  }

  function handleCancel(): void {
    setEditMode(false)
    setLocalData(user)
  }

  return (
    <Card style={{ textAlign: 'left' }}>
      <Dimmer active={!user.name || pending}>
        <Loader indeterminate>
          {pending ? 'Updating' : 'Preparing'} your profile
        </Loader>
      </Dimmer>
      <Image src={localData.avatarUrl} />
      <Card.Content>
        <Card.Header>
          {editMode ? (
            <Form.Input
              value={localData.name}
              name="name"
              size="mini"
              placeholder="name"
              onChange={handleChange}
            />
          ) : (
            user.name || ''
          )}
        </Card.Header>

        <JoinInfo user={user} />

        <Card.Description>
          {editMode ? (
            <Form.Input
              value={localData.description}
              size="mini"
              name="description"
              placeholder="motto"
              onChange={handleChange}
            />
          ) : (
            user.description || 'No motto set.'
          )}
        </Card.Description>
      </Card.Content>
      {editable && (
        <Card.Content extra>
          {editMode ? (
            <Button.Group>
              <Button positive onClick={handleSave}>
                Save
              </Button>
              <Button.Or />
              <Button onClick={handleCancel}>Cancel</Button>
            </Button.Group>
          ) : (
            <Button icon positive onClick={handleEdit}>
              Edit
            </Button>
          )}
        </Card.Content>
      )}
    </Card>
  )
}

export default function ProfileCard({ id, editable }: Props) {
  return (
    <SuspenseWithPerf fallback="loading" traceId="profile_card_load">
      <ProfileCardComponent id={id} editable={editable} />
    </SuspenseWithPerf>
  )
}

function JoinInfo({ user }: { user: User }) {
  const joinedFromNow = user.created
    ? formatDistanceToNow(user.created.toDate())
    : null

  return (
    <Card.Meta>
      {joinedFromNow ? (
        <span className="date">Joined {joinedFromNow} ago</span>
      ) : (
        ''
      )}
    </Card.Meta>
  )
}
