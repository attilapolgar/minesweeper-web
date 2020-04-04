import firebase from 'firebase'
import { auth as firebaseUiAuth } from 'firebaseui'

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebaseUiAuth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: firebaseUiAuth.CredentialHelper.NONE,
}
