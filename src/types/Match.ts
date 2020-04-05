export enum MatchStatus {
  WAITING = 'WAITING',
  STARTED = 'STARTED',
}

export type Match = {
  players: string[]
  id: string
  owner: string
  status: MatchStatus
}
