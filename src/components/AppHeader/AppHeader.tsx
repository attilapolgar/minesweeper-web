import React, { ReactElement } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, Button, Icon } from 'semantic-ui-react'
import { ProtectedRoutes } from '../../modules/protected/protected.routes'
import { auth } from '../../services/firebase'
import NewGameButton from '../../modules/game/components/NewGameButton'

export default function AppHeader(): ReactElement {
  const location = useLocation()
  return (
    <Menu pointing>
      <Menu.Item
        as={Link}
        name="Home"
        active={location.pathname === ProtectedRoutes.PROFILE}
        to={ProtectedRoutes.PROFILE}
      />

      <Menu.Item
        as={Link}
        name="Lobby"
        active={location.pathname === ProtectedRoutes.LOBBY}
        to={ProtectedRoutes.LOBBY}
      />

      <Menu.Menu position="right">
        <Menu.Item>
          <NewGameButton />
        </Menu.Item>
        <Menu.Item>
          <Button
            icon
            onClick={(): void => {
              auth.signOut()
            }}
          >
            <Icon name="log out" />
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
