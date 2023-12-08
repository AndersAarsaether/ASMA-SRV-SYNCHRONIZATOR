import Partner from '../enums/partner'
import Status from '../enums/status'
import { FeedbackFHIR } from '../schemas/feedback'
import { getPartnerFromString } from './partner.util'
import { getStatusFromString } from './status.util'

export function getUserIdFromFHIR(fhir: FeedbackFHIR): string {
    return fhir.subject.identifier.value
}

export function getPartnerFromFHIR(fhir: FeedbackFHIR): Partner {
    return getPartnerFromString(fhir.performer[0]!.identifier.value)
}

export function getStatusFromFHIR(fhir: FeedbackFHIR): Status {
    return getStatusFromString(fhir.status)
}

export function getTimestampFromFHIR(fhir: FeedbackFHIR): string {
    return fhir.effectiveDateTime
}
