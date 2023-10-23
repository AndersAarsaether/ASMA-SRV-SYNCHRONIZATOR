import Status from './feedbackStatus'

export interface FeedbackRatingsInternal {
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
