import Partner from '../enums/partner'
import Status from '../enums/status'

export interface Comments {
    userId: string
    partner: Partner
    comments: Comment[]
    timestamp: string
    status: Status
}

export interface Comment {
    activity: string
    text: string
}
