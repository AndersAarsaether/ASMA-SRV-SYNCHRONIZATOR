import Partner from '../enums/partner'
import { EnvConfigs } from '../envConfigs'
import { Credentials } from '../model-internal/credentials.model'

export function getPartnerCredentials(partner: Partner): Credentials {

  switch(partner){
    case Partner.Adfectus:
      return {
        apiKey: EnvConfigs.API_KEY_ADFECTUS,
        resourceUrl: EnvConfigs.API_URL_ADFECTUS
      }
  }
}
