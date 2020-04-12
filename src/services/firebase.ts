import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

export enum Functions {
  UPDATE_USER = 'updateUser',
  CREATE_MATCH = 'createMatch',
  JOIN_MATCH = 'joinMatch',
  READY_FOR_MATCH = 'readyForMatch',
  TRIGGER_FIELD = 'triggerField',
}
