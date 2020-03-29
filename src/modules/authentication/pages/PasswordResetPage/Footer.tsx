import React, { ReactElement } from 'react'
import { Icon, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export function Footer(): ReactElement {
  return (
    <Message>
      <Link to="/">
        <Icon name="arrow left" />
        back to sign in page
      </Link>
    </Message>
  )
}
