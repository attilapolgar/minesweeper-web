import React, { ReactElement } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { uiConfig } from '../../config'
import { auth } from '../../../../services/firebase'

export default function SignInPage(): ReactElement {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
}
