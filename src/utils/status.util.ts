import Status from '../enums/status'

export function getStatusFromString(status: string): Status {
    const statusLowercase = status.toLowerCase()

    switch (statusLowercase) {
        case 'before':
            return Status.Before
        case 'mid':
            return Status.Mid
        case 'final':
            return Status.Final
        default:
            return Status.During
    }
}
