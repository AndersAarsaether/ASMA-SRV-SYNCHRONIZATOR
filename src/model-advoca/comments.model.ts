import Status from '../enums/status'

export interface Comments {
    userId: string
    comments: Comment[]
    timestamp: string
    status: Status
}

export interface Comment {
    activity: string
    text: string
}
