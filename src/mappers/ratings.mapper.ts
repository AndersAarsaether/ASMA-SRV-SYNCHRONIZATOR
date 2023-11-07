import { statusToEnum } from '../model-internal/status.model'
import { FeedbackFHIR, Answer } from '../model-external/feedback.model'
import { Ratings, Rating } from '../model-internal/ratings.model'
import { userIdFromReference } from '../util/mapper.util'

export function feedbackRatingsFhirToInternalRatings(fhir: FeedbackFHIR): Ratings {
    if (!fhir.referenceRange) {
        throw new Error('Provided no reference range for the activity-ratings')
    }

    return {
        userId: userIdFromReference(fhir.subject.reference),
        minVal: fhir.referenceRange[0].low.value,
        maxVal: fhir.referenceRange[0].high.value,
        scores: answersToRatings(fhir.component),
        timestamp: fhir.effectiveDateTime,
        status: statusToEnum(fhir.status),
    } as Ratings
}

function answersToRatings(answers: Answer[]): Rating[] {
    try {
        return answers.map((answer) => ({ activity: answer.code.text, score: answer.valueInteger } as Rating))
    } catch (error) {
        throw new Error(`Failed to map answers to ratings: ${error.message}`)
    }
}
