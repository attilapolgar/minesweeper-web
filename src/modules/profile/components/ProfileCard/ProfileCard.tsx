import React, { ReactElement, useState, ChangeEvent, useEffect } from 'react'
import { useUser, useFirestore, useFirestoreDocData } from 'reactfire'
import { Form, Button, Card, Image, InputOnChangeData } from 'semantic-ui-react'
import { User as FirebaseUser } from 'firebase'

import { Collections } from '../../../../services/firebase'
import { User } from '../../../../types/User'

export default function ProfileCard(): ReactElement {
  const user = useUser<FirebaseUser>()
  const userDetailsRef = useFirestore()
    .collection(Collections.USERS)
    .doc(user.uid)
  const { name, description, avatarUrl }: User = useFirestoreDocData(
    userDetailsRef,
  )
  const [editMode, setEditMode] = useState(false)
  const [localData, setLocalData] = useState({
    name,
    description,
    avatarUrl,
  })
  function handleSave(): void {
    userDetailsRef.set({
      name: localData.name,
      description: localData.description,
      avatarUrl: `https://avatars.dicebear.com/v2/gridy/${localData.name}.svg?options[colorful]=1`,
    })
    setEditMode(false)
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
      avatarUrl: `https://avatars.dicebear.com/v2/gridy/${localData.name}.svg?options[colorful]=1`,
    }))
  }, [localData.name])

  function handleEdit(): void {
    setEditMode(true)
  }

  function handleCancel(): void {
    setEditMode(false)
    setLocalData({ name, description, avatarUrl })
  }

  return (
    <Card style={{ textAlign: 'left' }}>
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
            name
          )}
        </Card.Header>
        <Card.Meta>
          <span className="date">Joined in 2020</span>
        </Card.Meta>
        <Card.Description>
          {editMode ? (
            <Form.Input
              value={localData.description}
              size="mini"
              name="description"
              placeholder="motto"
              onChange={handleChange}
            />
          ) : description ? (
            description
          ) : (
            `${name} has no motto.`
          )}
        </Card.Description>
      </Card.Content>
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
    </Card>
  )
}
