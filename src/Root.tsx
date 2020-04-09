import React, { ReactElement } from 'react'

import App from './App'
import { FirebaseAppProvider, SuspenseWithPerf } from 'reactfire'
import { firebaseConfig } from './services/firebase'
import AppLoader from './components/AppLoader'
import { Grid } from 'semantic-ui-react'

export default function Root(): ReactElement {
  return (
    <React.StrictMode>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <SuspenseWithPerf fallback={<AppLoader />} traceId="app_load">
          <Grid centered>
            <Grid.Column width={10}>
              <App />
            </Grid.Column>
          </Grid>
        </SuspenseWithPerf>
      </FirebaseAppProvider>
    </React.StrictMode>
  )
}
