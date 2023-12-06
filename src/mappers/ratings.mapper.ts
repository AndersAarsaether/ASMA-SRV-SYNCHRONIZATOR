import { FeedbackFHIR, Answer } from '../model-partners/feedback.model'
import { Ratings, Rating } from '../model-advoca/ratings.model'
import { userIdFromReference } from '../utils/mapper.util'
import { getPartnerFromString } from '../utils/partner.util'
import { getStatusFromString } from '../utils/status.util'

export function FHIRFeedbackToRatings(fhir: FeedbackFHIR): Ratings {
    if (!fhir.referenceRange) {
        throw new Error('Provided no reference range for the activity-ratings')
    }

    return {
        userId: userIdFromReference(fhir.subject.reference),
        partner: getPartnerFromString(fhir.performer.identifier.value),
        minVal: fhir.referenceRange[0].low.value,
        maxVal: fhir.referenceRange[0].high.value,
        scores: answersToRatings(fhir.component),
        timestamp: fhir.effectiveDateTime,
        status: getStatusFromString(fhir.status),
    } as Ratings
}

function answersToRatings(answers: Answer[]): Rating[] {
    try {
        return answers.map((answer) => ({ activity: answer.code.text, score: answer.valueInteger } as Rating))
    } catch (error) {
        throw new Error(`Failed to map answers to ratings: ${error.message}`)
    }
}
