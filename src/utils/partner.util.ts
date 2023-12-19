import Partner from '../enums/partner'
import { EnvConfigs } from '../EnvConfigs'
import Credentials from '../types/credentials'

export function isValidPartnerString(partnerString: string): boolean {
    return Object.values(Partner).includes(partnerString as Partner)
}

export function getPartnerFromString(partnerString: string): Partner {
    const partnerLowerCase = partnerString.toLowerCase()

    switch (partnerLowerCase) {
        case 'adfectus':
            return Partner.Adfectus
        default:
            throw new Error('Invalid partner string')
    }
}

export function getCredentialsFromPartner(partner: Partner): Credentials {
    switch (partner) {
        case Partner.Adfectus:
            return {
                apiKey: EnvConfigs.API_KEY_ADFECTUS,
                resourceUrl: EnvConfigs.API_URL_ADFECTUS,
            }
    }
}
