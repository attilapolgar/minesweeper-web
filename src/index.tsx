import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'

import App from './App'
import * as serviceWorker from './serviceWorker'
import UserProvider from './providers/UserProvider'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from './services/firebase'

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <UserProvider>
        <App />
      </UserProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
