import React, { ReactElement, useState, useEffect } from 'react'
import {
  useFirestore,
  useFirestoreDocData,
  useUser,
  useFunctions,
} from 'reactfire'
import { Button, Grid, Icon, Header } from 'semantic-ui-react'
import { User } from 'firebase'
import styled from 'styled-components'
import { Match as MatchType, MatchStatus } from '../../../../types/Match'
import MatchPlayer from '../MatchPlayer'
import { Functions } from '../../../../services/firebase'

type Props = {
  id: string
}

export default function Match({ id }: Props): ReactElement | null {
  const me = useUser<User>()
  const [match, setMatch] = useState<MatchType | null>(null)

  const matchRef = useFirestore().collection('matches').doc(id)
  const remoteMatch: MatchType = useFirestoreDocData(matchRef, {
    idField: 'id',
  })
  const joinMatch = useFunctions().httpsCallable(Functions.JOIN_MATCH)
  const triggerField = useFunctions().httpsCallable(Functions.TRIGGER_FIELD)
  const [pending, setPending] = useState(false)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (remoteMatch) {
      setMatch(remoteMatch)
    }
  }, [remoteMatch])

  async function handleAcceptGame() {
    try {
      setPending(true)
      await joinMatch({ matchId: id })
    } catch (error) {
      console.log('error', error)
    } finally {
      setPending(false)
    }
  }

  async function handleFieldClick(fieldIndex: number) {
    const myTurn =
      !!match &&
      !locked &&
      match.activePlayer === me.uid &&
      match.status === MatchStatus.STARTED
    if (myTurn) {
      try {
        setLocked(true)
        const result = await triggerField({ matchId: id, fieldIndex })
        console.log('result', result)
        setMatch((prev) => ({ ...prev, ...result.data }))
      } catch (error) {
        console.log('error', error)
      } finally {
        setLocked(false)
      }
    }
  }

  const myGame = !!match && match.playerIds.includes(me.uid)
  const canIJoin = !myGame && !!match && match.status === MatchStatus.WAITING

  if (!match) {
    return null
  }

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={4}>
          <MatchPlayer player={match.players[0]} match={match} />
          <Header>{match.status}</Header>
          {match.players[1] && (
            <MatchPlayer player={match.players[1]} match={match} />
          )}
          {canIJoin && (
            <Button onClick={handleAcceptGame} positive fluid loading={pending}>
              Join match
            </Button>
          )}
        </Grid.Column>
        <Grid.Column width={12}>
          <Board
            data={match ? match.view : ''}
            locked={locked}
            onFieldClick={handleFieldClick}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

type FieldType = {
  id: string
  revealed: boolean
  number: number | null
}

type BoardType = {
  size: number
  fields: FieldType[]
}

export enum FieldCodeTable {
  UNREVEALED = '_',
  MINE = 'X',
  SEPARATOR = ';',
}

function Board({
  data = '',
  locked,
  onFieldClick = () => null,
}: {
  data: string
  locked: boolean
  onFieldClick: (fieldIndex: number) => void
}) {
  const fields = data.split(';').map((field, i) => ({
    id: `${field}-${i}`,
    revealed: field !== FieldCodeTable.UNREVEALED,
    number: Number.isNaN(Number.parseInt(field)) ? null : +field,
    mine: field[0] === FieldCodeTable.MINE,
    color: getColor(field),
  }))

  return (
    <BoardWrapper locked={locked}>
      {fields.map((field, i) => (
        <Field
          locked={locked}
          onClick={() => onFieldClick(i)}
          key={field.id}
          id={field.id}
          revealed={field.revealed}
          number={field.number}
        >
          {!!field.revealed && !!field.number && field.number}
          {!!field.revealed && field.mine && (
            <Icon fitted name="flag" color={field.color} />
          )}
        </Field>
      ))}
    </BoardWrapper>
  )
}

const BoardWrapper = styled.div<{ locked: boolean }>`
  margin: 0 auto;
  display: grid;
  grid-gap: 2px;
  grid-template-columns: repeat(16, 40px);
  grid-template-rows: repeat(16, 40px);
  grid-auto-flow: row;
`

const colors = [
  'transparent',
  'blue',
  'green',
  'red',
  'brown',
  'aqua',
  'beige',
  'black',
  'coral',
]

const Field = styled.div<FieldType & { locked: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ revealed }) =>
    revealed ? 'transparent' : 'lightgrey'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 2px;
  border-color: ${({ revealed }) => (revealed ? 'transparent' : 'grey')};
  color: ${({ number }) => (number ? colors[number] : 'transparent')};
  font-size: 18px;
  font-weight: bold;
  cursor: ${({ revealed, locked }) => {
    if (locked) {
      return 'progress'
    }
    return revealed ? 'default' : 'pointer'
  }};
  &:hover {
    border-color: ${({ revealed }) => (revealed ? 'transparent' : 'black')};
  }
`

function getColor(value: string): 'red' | 'blue' | 'black' {
  const asd = value.split(':')
  if (asd[0] === FieldCodeTable.MINE) {
    if (asd[1] === 'red') {
      return 'red'
    }
    if (asd[1] === 'blue') {
      return 'blue'
    }

    return 'black'
  }
  return 'black'
}
