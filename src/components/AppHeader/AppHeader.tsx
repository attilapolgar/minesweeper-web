import React, { ReactElement } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import { ProtectedRoutes } from '../../modules/protected/protected.routes'
import { auth } from '../../services/firebase'

export default function AppHeader(): ReactElement {
  const location = useLocation()
  return (
    <Menu>
      <Menu.Item
        name="profile"
        active={location.pathname === ProtectedRoutes.PROFILE}
      >
        <Link to={ProtectedRoutes.PROFILE}>Profile</Link>
      </Menu.Item>

      <Menu.Item
        name="lobby"
        active={location.pathname === ProtectedRoutes.LOBBY}
      >
        <Link to={ProtectedRoutes.LOBBY}>Lobby</Link>
      </Menu.Item>
      <Menu.Item
        name="matches"
        active={location.pathname === ProtectedRoutes.MATCHES}
      >
        <Link to={ProtectedRoutes.MATCHES}>Matches</Link>
      </Menu.Item>
      <Menu.Item
        name="match"
        active={location.pathname === ProtectedRoutes.MATCH}
      >
        <Link to={ProtectedRoutes.MATCH}>Match</Link>
      </Menu.Item>
      <Menu.Item position="right">
        <Button
          onClick={(): void => {
            auth.signOut()
          }}
        >
          Sign out
        </Button>
      </Menu.Item>
    </Menu>
  )
}
