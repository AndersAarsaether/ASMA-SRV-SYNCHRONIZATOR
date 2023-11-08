import Partner from './../enums/partner'

export interface User {
    userId: string
    groupId: string
    instId: string
    firstname: string
    arrivalDate: Date
}

export interface UserRequest {
    recipient: string
    user: User
}
