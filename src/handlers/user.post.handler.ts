import { internalUserToFHIRUser } from '../mappers/user.mapper'
import { UserRequest } from '../model-internal/user.model'
import { postUser } from '../proxy/external.proxy'
import { partnerToEnum } from './../enums/partner'
import { getPartnerCredentials } from './../util/partner.util'

export default function handlePostUser(request: UserRequest) {
    try {
        const fhirUser = internalUserToFHIRUser(request.user)
        const partner = partnerToEnum(request.recipient)
        const credentials = getPartnerCredentials(partner)
        postUser(fhirUser, credentials)
    } catch (error) {
        throw error
    }
}
