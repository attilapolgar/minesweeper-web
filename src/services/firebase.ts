import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { generateAvatarUrl } from '../modules/profile/profile.utils'

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_WEBAPP_API_KEY,
  appId: process.env.REACT_APP_FIREBASE_WEBAPP_APP_ID,
  authDomain: process.env.REACT_APP_FIREBASE_WEBAPP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_WEBAPP_DATABASE_URL,
  measurementId: process.env.REACT_APP_FIREBASE_WEBAPP_MEASUREMENT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_WEBAPP_MESSAGING_SENDER_ID,
  projectId: process.env.REACT_APP_FIREBASE_WEBAPP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_WEBAPP_STORAGE_BUCKET,
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export enum Collections {
  MATCHES = 'matches',
  USERS = 'users',
}

auth.onAuthStateChanged(async (user) => {
  try {
    if (!!user && !user.isAnonymous) {
      const ref = firebase
        .firestore()
        .collection(Collections.USERS)
        .doc(user.uid)

      const data = await ref.get()

      if (!data.exists) {
        const name = user.displayName || 'NoName'
        const avatarUrl = generateAvatarUrl(name)
        const description = ''
        const created = firebase.firestore.FieldValue.serverTimestamp()

        ref.set({ name, description, avatarUrl, created })
      } else {
        console.log('useCreateUserData: has user data', user.uid)
      }
    }
  } catch (error) {
    console.log('error', error)
  }
})
