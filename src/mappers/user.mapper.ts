import { TypeValue, UserFHIR, Type, Contact } from '../model-partners/user.model'
import { User } from '../model-advoca/user.model'

export function userToFHIRUser(user: User): UserFHIR {
    try {
        const fhir = {
            resourceType: 'Patient',
            identifier: [typeValue('userId', user.userId), typeValue('groupId', user.groupId)] as [
                TypeValue,
                TypeValue,
            ],
            name: [makeType(user.firstname)] as [Type],
            contact: [
                {
                    organization: {
                        identifier: typeValue('institutionId', user.instId) as TypeValue,
                    },
                    period: {
                        start: user.arrivalDate,
                        end: new Date().toISOString(),
                    },
                },
            ] as [Contact],
        }
        return fhir
    } catch (error) {
        throw new Error(`Failed to map user to FHIR structure: ${error.message}`)
    }
}

function makeType(text: string) {
    return { text: text }
}

function typeValue(type: string, value: string): TypeValue {
    return {
        type: makeType(type),
        value: value,
    }
}
