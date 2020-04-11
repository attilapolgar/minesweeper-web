import React, { ReactElement, useState } from 'react'
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

export default function Match({ id }: Props): ReactElement {
  const me = useUser<User>()

  const matchRef = useFirestore().collection('matches').doc(id)
  const match: MatchType = useFirestoreDocData(matchRef, { idField: 'id' })
  const joinMatch = useFunctions().httpsCallable(Functions.JOIN_MATCH)
  const [pending, setPending] = useState(false)

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

  const data = {
    size: 16,
    fields: Array(16 * 16)
      .fill(null)
      .map((field, i) => ({
        id: `field-${i}`,
        revealed: false,
        mine: false,
        number: 0,
        found: false,
        color: 'blue',
      })),
  }

  const myGame = match.playerIds.includes(me.uid)
  const canIJoin = !myGame && match.status === MatchStatus.WAITING
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
          <Board data={data} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

type FieldType = {
  id: string
  revealed: boolean
  mine: boolean
  number: number
  found: boolean
  color: string
}

type BoardType = {
  size: number
  fields: FieldType[]
}

function Board({ data }: { data: BoardType }) {
  return (
    <BoardWrapper>
      {data.fields.map((field) => (
        <Field
          key={field.id}
          id={field.id}
          revealed={field.revealed}
          mine={field.mine}
          number={field.number}
          found={field.found}
          color={field.color}
        >
          {field.found && (
            <Icon
              fitted
              name="flag"
              color={field.color === 'red' ? 'red' : 'blue'}
            />
          )}
          {!field.found && field.mine && (
            <Icon fitted name="bomb" color="black" />
          )}
          {!field.found && !field.mine && field.number}
        </Field>
      ))}
    </BoardWrapper>
  )
}

const BoardWrapper = styled.div`
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

const Field = styled.div<FieldType>`
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
  color: ${({ number }) => colors[number]};
  font-size: 18px;
  font-weight: bold;
  cursor: ${({ revealed }) => (revealed ? 'default' : 'pointer')};
  &:hover {
    border-color: ${({ revealed }) => (revealed ? 'transparent' : 'black')};
  }
`
