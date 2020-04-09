import React, { ReactElement } from 'react'
import { FirebaseAppProvider, SuspenseWithPerf, AuthCheck } from 'reactfire'
import { Grid } from 'semantic-ui-react'

import { firebaseConfig, auth } from './services/firebase'
import App from './App'
import AppLoader from './components/AppLoader'
import SignInPage from './modules/authentication/pages/SignInPage'

export default function Root(): ReactElement {
  return (
    <React.StrictMode>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <SuspenseWithPerf fallback={<AppLoader />} traceId="app_load">
          <Grid centered>
            <Grid.Column width={10}>
              <AuthCheck fallback={<SignInPage />} auth={auth}>
                <App />
              </AuthCheck>
            </Grid.Column>
          </Grid>
        </SuspenseWithPerf>
      </FirebaseAppProvider>
    </React.StrictMode>
  )
}
