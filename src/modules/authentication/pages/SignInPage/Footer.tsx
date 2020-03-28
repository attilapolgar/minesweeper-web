import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'semantic-ui-react'

import { AuthenticationRoutes } from '../../authentication.routes'

export function Footer(): ReactElement {
  return (
    <>
      <Divider />
      Don&apos;t have an account?{' '}
      <Link to={AuthenticationRoutes.SIGNUP}>Sign up here</Link>
      <div>
        <Link to={AuthenticationRoutes.PASSWORD_RESET}>Forgot Password?</Link>
      </div>
    </>
  )
}
