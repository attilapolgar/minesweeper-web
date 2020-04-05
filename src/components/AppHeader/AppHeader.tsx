import React, { ReactElement } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, Button, Icon } from 'semantic-ui-react'
import { ProtectedRoutes } from '../../modules/protected/protected.routes'
import { auth } from '../../services/firebase'
import NewGameButton from '../../modules/game/components/NewGameButton'

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
        <Link to={ProtectedRoutes.MATCHES}>Current matches</Link>
      </Menu.Item>

      <Menu.Item position="right">
        <NewGameButton />

        <Button
          icon
          labelPosition="left"
          onClick={(): void => {
            auth.signOut()
          }}
        >
          Sign out
          <Icon name="log out" />
        </Button>
      </Menu.Item>
    </Menu>
  )
}
