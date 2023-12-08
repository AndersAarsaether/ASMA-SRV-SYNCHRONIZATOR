import { User } from '../model/user'
import { UserFHIR, UserFHIRSchema } from '../schemas/user'

export function userToFHIRUser(user: User): UserFHIR {
    try {
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
    } catch (error) {
        throw new Error(`Failed to map user to FHIR structure: ${error.message}`)
    }
}
