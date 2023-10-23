import { statusToEnum } from '../model-internal/feedbackStatus'
import { FeedbackFHIR, Answer } from '../model-external/feedbackFHIR'
import { FeedbackRatingsInternal, Rating } from '../model-internal/feedbackRatings'
import { userIdFromReference } from './../util/mapper.util'

export function feedbackRatingsFhirToInternalRatings(fhir: FeedbackFHIR): FeedbackRatingsInternal {
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
    } as FeedbackRatingsInternal
}

function answersToRatings(answers: Answer[]): Rating[] {
    try {
        return answers.map((answer) => ({ activity: answer.code.text, score: answer.valueInteger } as Rating))
    } catch (error) {
        throw new Error(`Failed to map answers to ratings: ${error}`)
    }
}
