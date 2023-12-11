import { User, UserFHIR, UserFHIRSchema } from '../schemas/user'

export function userToFHIRUser(user: User): UserFHIR {
    const object = {
        resourceType: 'Patient',
        identifier: [
            { type: { text: 'userId' }, value: user.userId },
            { type: { text: 'groupId' }, value: user.groupId },
        ],
        name: [{ text: user.firstname }],
        contact: [
            {
                organization: {
                    identifier: {
                        type: { text: 'institutionId' },
                        value: user.instId,
                    },
                },
                period: {
                    start: user.arrivalDate,
                },
            },
        ],
    }
    return UserFHIRSchema.parse(object)
}
