import { userToFHIRUser } from '../mappers/user.mapper'
import { User } from '../model/user'
import { postUser } from '../proxy/partner.proxy'
import { getPartnerFromString, getCredentialsFromPartner } from '../utils/partner.util'

export default async function handlePostUser(user: User, partnerString: string, authToken: string): Promise<string> {
    const fhirUser = userToFHIRUser(user)
    const partner = getPartnerFromString(partnerString)
    const credentials = getCredentialsFromPartner(partner)
    return postUser(fhirUser, credentials, authToken).then((response) => JSON.parse(response))
}
