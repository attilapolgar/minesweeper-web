import { TimeStamp } from './TimeStamp'

export enum MatchStatus {
  WAITING = 'WAITING',
  READY_TO_START = 'READY_TO_START',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export enum MatchPlayerStatus {
  JOINED = 'JOINED',
  READY = 'READY',
}

export type MatchPlayer = {
  userId: string
  score: number
  color: 'red' | 'blue'
  status: MatchPlayerStatus
}

export type Match = {
  players: MatchPlayer[]
  playerIds: string[]
  id: string
  status: MatchStatus
  activePlayer: string | null
  createdBy: string
  createdAt: TimeStamp
}
