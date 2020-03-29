import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { AuthenticationRoutes } from '../../authentication.routes'
import { Message } from 'semantic-ui-react'

export function Footer(): ReactElement {
  return (
    <Message>
      Don&apos;t have an account?{' '}
      <Link to={AuthenticationRoutes.SIGNUP}>Sign up here</Link>
      <div>
        <Link to={AuthenticationRoutes.PASSWORD_RESET}>Forgot Password?</Link>
      </div>
    </Message>
  )
}
