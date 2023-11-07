import Status from './status.model'

export interface Ratings {
    userId: string
    minVal: number
    maxVal: number
    scores: Rating[]
    timestamp: Date
    status: Status
}

export interface Rating {
    activity: string
    score: number
}
