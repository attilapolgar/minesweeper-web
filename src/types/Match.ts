export enum MatchStatus {
  WAITING = 'WAITING',
  READY_TO_START = 'READY_TO_START',
  STARTED = 'STARTED',
}

export type Match = {
  players: string[]
  id: string
  owner: string
  status: MatchStatus
  created: TimeStamp
}

type TimeStamp = {
  toDate: Function
}
