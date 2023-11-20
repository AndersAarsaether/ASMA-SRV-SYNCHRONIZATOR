import { userToFHIRUser } from '../mappers/user.mapper'
import { UserRequest } from '../model-advoca/user.model'
import { postUser } from '../proxy/partner.proxy'
import { partnerToEnum } from './../enums/partner'
import { getPartnerCredentials } from './../util/partner.util'

export default async function handlePostUser(request: UserRequest, authToken: string): Promise<string> {
    try {
        const fhirUser = userToFHIRUser(request.user)
        const partner = partnerToEnum(request.recipient)
        const credentials = getPartnerCredentials(partner)
        return postUser(fhirUser, credentials, authToken)
            .then((response) => response)
            .catch((error) => {
                throw new Error(error)
            })
    } catch (error) {
        throw error
    }
}
