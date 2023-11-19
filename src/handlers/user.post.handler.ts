import { userToFHIRUser } from '../mappers/user.mapper'
import { UserRequest } from '../model-advoca/user.model'
import { postUser } from '../proxy/partner.proxy'
import { partnerToEnum } from './../enums/partner'
import { getPartnerCredentials } from './../util/partner.util'

export default function handlePostUser(request: UserRequest, authToken: string) {
    try {
        const fhirUser = userToFHIRUser(request.user)
        const partner = partnerToEnum(request.recipient)
        const credentials = getPartnerCredentials(partner)
        postUser(fhirUser, credentials, authToken)
    } catch (error) {
        throw error
    }
}
