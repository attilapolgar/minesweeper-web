import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

type Props = {}

export default function Header({}: Props): ReactElement {
  return (
    <nav>
      <ul>
        <li>
          <Button as={Link} to="/login">
            Login
          </Button>
        </li>
        <li>
          <Button as={Link} to="/">
            Home
          </Button>
        </li>
      </ul>
    </nav>
  )
}
