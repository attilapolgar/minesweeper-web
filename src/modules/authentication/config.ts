import firebase from 'firebase'
import { auth as firebaseUiAuth } from 'firebaseui'

export const uiConfig: firebaseUiAuth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseUiAuth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: (authResult, redirectUrl): boolean => {
      console.log('signInSuccessWithAuthResult', { authResult, redirectUrl })
      return true
    },
  },
  credentialHelper: firebaseUiAuth.CredentialHelper.NONE,
}
