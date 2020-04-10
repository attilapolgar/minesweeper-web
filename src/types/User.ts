import { User as FirebaseUserType } from 'firebase'

import { TimeStamp } from './TimeStamp'

export type User = {
  name: string
  description: string
  avatarUrl: string
  rank?: string
  created: TimeStamp
}

export type FirebaseUser = FirebaseUserType
