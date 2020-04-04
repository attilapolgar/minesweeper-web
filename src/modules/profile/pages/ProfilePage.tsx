import React, { ReactElement } from 'react'
import styled from 'styled-components'
import {
  useFirestoreDocData,
  useFirestore,
  SuspenseWithPerf,
  useUser,
} from 'reactfire'

import { UserContext } from '../../../providers/UserProvider'
import { auth } from '../../../services/firebase'
import { Button } from 'semantic-ui-react'

export default function ProfilePage(): ReactElement | null {
  // const user = useUser()

  return (
    <SuspenseWithPerf fallback={'loading field...'} traceId={'load-field'}>
      <Field />
      <Button
        onClick={(): void => {
          auth.signOut()
        }}
      >
        Sign out
      </Button>
    </SuspenseWithPerf>
  )
}
type Field = {
  revealed: boolean
  value: number
}

function Field(): ReactElement {
  const fieldRef = useFirestore().collection('demo').doc('demo-field')
  const field = useFirestoreDocData<Field>(fieldRef)

  function handlePress(): void {
    fieldRef.update({ revealed: !field.revealed, value: 3 })
  }

  console.log('field', field)

  return (
    <StyledField revealed={field.revealed} onClick={handlePress}>
      {!!field.revealed && <Value>{field.value}</Value>}
    </StyledField>
  )
}

const StyledField = styled.div<{ revealed: boolean }>`
  width: 50px;
  height: 50px;
  background-color: ${({ revealed }) => (revealed ? 'white' : 'lightgrey')};
  border-radius: 4px;
  margin: 25px;
  cursor: pointer;
  border: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Value = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: blue;
`
