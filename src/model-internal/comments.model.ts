import Status from './status.model'

export interface Comments {
    userId: string
    comments: Comment[]
    timestamp: Date
    status: Status
}

export interface Comment {
    activity: string
    text: string
}
