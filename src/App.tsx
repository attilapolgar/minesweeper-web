import React, { ReactElement } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ProtectedRoutes } from './modules/protected/protected.routes'
import AppHeader from './components/AppHeader'
import LobbyPage from './modules/lobby/pages/LobbyPage'
import MatchPage from './modules/game/pages/MatchPage'
import ProfilePage from './modules/profile/pages/ProfilePage'
import PublicProfile from './modules/profile/pages/PublicProfile'

export default function App(): ReactElement {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route exact path={ProtectedRoutes.LOBBY}>
          <LobbyPage />
        </Route>

        <Route exact path={ProtectedRoutes.PROFILE}>
          <ProfilePage />
        </Route>

        <Route path={ProtectedRoutes.PUBLIC_PROFILE}>
          <PublicProfile />
        </Route>

        <Route path={ProtectedRoutes.MATCH}>
          <MatchPage />
        </Route>
      </Switch>
    </Router>
  )
}
