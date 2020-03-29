import React, { ReactElement, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import SignInPage from './modules/authentication/pages/SignInPage'
import ProfilePage from './modules/profile/pages/ProfilePage'
import SignUpPage from './modules/authentication/pages/SignUpPage'
import PasswordResetPage from './modules/authentication/pages/PasswordResetPage'
import { AuthenticationRoutes } from './modules/authentication/authentication.routes'
import { UserContext } from './providers/UserProvider'

export default function App(): ReactElement {
  const user = useContext(UserContext)

  return user ? (
    <ProfilePage />
  ) : (
    <Router>
      <div>
        <Switch>
          <Route path={AuthenticationRoutes.SIGNUP}>
            <SignUpPage />
          </Route>

          <Route path={AuthenticationRoutes.PASSWORD_RESET}>
            <PasswordResetPage />
          </Route>

          <Route path={AuthenticationRoutes.SIGNIN}>
            <SignInPage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
