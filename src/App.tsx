import React, { ReactElement, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SignInPage from './modules/authentication/pages/SignInPage'
import ProfilePage from './modules/profile/pages/ProfilePage'
import { AuthenticationRoutes } from './modules/authentication/authentication.routes'
import { UserContext } from './providers/UserProvider'

export default function App(): ReactElement {
  const user = useContext(UserContext)

  return user ? (
    <ProfilePage />
  ) : (
    <Router>
      <Switch>
        <Route path={AuthenticationRoutes.SIGNIN}>
          <SignInPage />
        </Route>
      </Switch>
    </Router>
  )
}
