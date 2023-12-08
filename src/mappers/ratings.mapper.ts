import { getPartnerFromFHIR, getStatusFromFHIR, getTimestampFromFHIR, getUserIdFromFHIR } from '../utils/mapper.util'
import { FeedbackFHIR } from '../schemas/feedback'
import { Ratings, Rating } from '../types/ratings'

function getMinValueFromFHIR(fhir: FeedbackFHIR): number {
    return fhir.referenceRange[0]!.low.value
}

function getMaxValueFromFHIR(fhir: FeedbackFHIR): number {
    return fhir.referenceRange[0]!.high.value
}

function getScoresFromFHIR(fhir: FeedbackFHIR): Rating[] {
    try {
        return fhir.component.map((answer) => ({ activity: answer.code.text, score: answer.valueInteger } as Rating))
    } catch (error) {
        throw new Error(`Failed to map answers to ratings: ${error.message}`)
    }
}

export function FHIRFeedbackToRatings(fhir: FeedbackFHIR): Ratings {
    const ratings: Ratings = {
        userId: getUserIdFromFHIR(fhir),
        partner: getPartnerFromFHIR(fhir),
        minVal: getMinValueFromFHIR(fhir),
        maxVal: getMaxValueFromFHIR(fhir),
        scores: getScoresFromFHIR(fhir),
        timestamp: getTimestampFromFHIR(fhir),
        status: getStatusFromFHIR(fhir),
    }

    return ratings
}
