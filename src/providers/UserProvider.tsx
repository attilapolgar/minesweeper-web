import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  ReactElement,
} from 'react'

import { auth } from '../services/firebase'
import { User } from 'firebase'

type Props = {
  children: ReactNode
}

export const UserContext = createContext<User | null>(null)

export default function UserProvider({ children }: Props): ReactElement {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (!userAuth) {
        setUser(null)
        return
      }

      setUser(userAuth)
    })
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
