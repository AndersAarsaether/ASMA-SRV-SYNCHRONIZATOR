import Status from './feedbackStatus'

export interface FeedbackCommentsInternal {
    userId: string
    comments: Comment[]
    timestamp: Date
    status: Status
}

export interface Comment {
    activity: string
    text: string
}
