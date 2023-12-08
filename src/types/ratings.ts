import Partner from '../enums/partner'
import Status from '../enums/status'

export type Ratings = {
    userId: string
    partner: Partner
    minVal: number
    maxVal: number
    scores: Rating[]
    timestamp: string
    status: Status
}

export type Rating = {
    activity: string
    score: number
}
