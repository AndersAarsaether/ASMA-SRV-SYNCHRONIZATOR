import Partner from '../enums/partner'
import Status from '../enums/status'

export type Comments = {
    userId: string
    partner: Partner
    comments: Comment[]
    timestamp: string
    status: Status
}

export type Comment = {
    activity: string
    text: string
}
