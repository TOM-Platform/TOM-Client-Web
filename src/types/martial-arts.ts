export enum PunchType {
  ALL = 'ALL',
  LEFT_JAB = 'LEFT_JAB',
  LEFT_CROSS = 'LEFT_CROSS',
  RIGHT_JAB = 'RIGHT_JAB',
  RIGHT_CROSS = 'RIGHT_CROSS'
}

export const readablePunchType: Record<PunchType, string> = {
  [PunchType.ALL]: 'All Punches',
  [PunchType.LEFT_JAB]: 'Left Jab',
  [PunchType.LEFT_CROSS]: 'Left Cross',
  [PunchType.RIGHT_JAB]: 'Right Jab',
  [PunchType.RIGHT_CROSS]: 'Right Cross'
}

export interface PunchData {
  hand: number
  name: string
  punchType: PunchType
}

interface Vector3 {
  x: number
  y: number
  z: number
}

export interface CollisionData {
  angle: number
  collisionPoint: Vector3
  distanceToTarget: number
  hand: number
  padPosition: Vector3
  velocity: Vector3
}

export interface SequenceData {
  punches: PunchData[]
}

export interface RawData {
  collisionData: CollisionData
  feedback_category: string
  punchData: PunchData
  reactionTime: number
  sequenceData: SequenceData
}

export interface SessionData {
  bad_angle: number
  datetime: number
  good_punch: number
  id: number
  interval_duration: number
  off_target: number
  punch_dict: Record<string, number>
  raw_data: RawData[]
  session_duration: string
  total_punches: number
  total_reaction_time: number
  uncategorized: number
}
