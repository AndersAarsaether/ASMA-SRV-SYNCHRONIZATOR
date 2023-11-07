import { internalUserToFHIRUser } from '../mappers/user.mapper'
import { User } from '../model-internal/user.model'
import { postUser } from '../proxy/adfectus.proxy'

export default function handlePostUser(user: User) {
    try {
        const fhirUser = internalUserToFHIRUser(user)
        postUser(fhirUser)
    } catch (error) {
        throw error
    }
}
