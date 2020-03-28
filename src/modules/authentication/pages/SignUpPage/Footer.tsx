import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'semantic-ui-react'

import { AuthenticationRoutes } from '../../authentication.routes'

export function Footer(): ReactElement {
  return (
    <>
      <Divider />
      <p>
        Already have an account?{' '}
        <Link to={AuthenticationRoutes.SIGNIN}>Sign in here</Link>
      </p>
    </>
  )
}
