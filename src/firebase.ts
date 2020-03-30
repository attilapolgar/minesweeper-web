import firebase, { User } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
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

const provider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = (): void => {
  auth.signInWithPopup(provider)
}

export const generateUserDocument = async (
  user: User,
  additionalData: object,
): Promise<void> => {
  if (!user) return
  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      })
    } catch (error) {
      console.error('Error creating user document', error)
    }
  }
}
