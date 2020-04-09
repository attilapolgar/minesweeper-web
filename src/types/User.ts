import { User as FirebaseUserType } from 'firebase'

export type User = {
  name: string
  description: string
  avatarUrl: string
}

export type FirebaseUser = FirebaseUserType
