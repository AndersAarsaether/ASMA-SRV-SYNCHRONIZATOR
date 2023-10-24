import { internalUserToFHIRUser } from '../mappers/user.mapper'
import { User } from '../model-internal/user'
import { postUser } from '../proxy/adfectusProxy'

export default function handlePostUser(user: User) {
    try {
        const fhirUser = internalUserToFHIRUser(user)
        postUser(fhirUser)
    } catch (error) {
        throw error
    }
}
