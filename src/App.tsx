import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthCheck } from 'reactfire'

import SignInPage from './modules/authentication/pages/SignInPage'
import ProfilePage from './modules/profile/pages/ProfilePage'
import { ProtectedRoutes } from './modules/protected/protected.routes'
import LobbyPage from './modules/lobby/pages/LobbyPage'
import { auth } from './services/firebase'
import AppHeader from './components/AppHeader'
import MatchesPage from './modules/game/pages/MatchesPage'
import MatchPage from './modules/game/pages/MatchPage'

export default function App(): ReactElement {
  return (
    <AuthCheck fallback={<SignInPage />} auth={auth}>
      <Router>
        <AppHeader />
        <Switch>
          <Route exact path={ProtectedRoutes.LOBBY}>
            <LobbyPage />
          </Route>
          <Route exact path={ProtectedRoutes.PROFILE}>
            <ProfilePage />
          </Route>
          <Route path={ProtectedRoutes.MATCHES}>
            <MatchesPage />
          </Route>
          <Route path={ProtectedRoutes.MATCH}>
            <MatchPage />
          </Route>
        </Switch>
      </Router>
    </AuthCheck>
  )
}
