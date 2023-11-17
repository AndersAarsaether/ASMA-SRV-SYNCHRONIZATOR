enum Status {
    Before = 'before',
    Mid = 'mid',
    Final = 'final',
    Continuous = 'continuous',
}
export default Status

export function statusToEnum(status: string): Status {
    const statusLowercase = status.toLowerCase()

    switch (statusLowercase) {
        case 'before':
            return Status.Before
        case 'mid':
            return Status.Mid
        case 'final':
            return Status.Final
        default:
            return Status.Continuous
    }
}
