import FeedbackScoreFHIR from '../model/feedbackScoreFHIR'
import FeedbackScoreInternal from '../model/FeedbackScoreInternal'

export function feedbackScoreFhirToInternal(fhir: FeedbackScoreFHIR): FeedbackScoreInternal {
    return {
        userId: userIdFromReference(fhir.subject.reference),
    }
}

function userIdFromReference(reference: string): string {
    const typeAndUserId = reference.split('/')
    const userId = typeAndUserId[1]
    return userId
}
