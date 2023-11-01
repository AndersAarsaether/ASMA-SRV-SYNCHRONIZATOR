import { statusToEnum } from '../model-internal/feedbackStatus'
import { FeedbackFHIR, Answer } from '../model-external/feedbackFHIR'
import { FeedbackCommentsInternal, Comment } from '../model-internal/feedbackComments'
import { userIdFromReference } from './../util/mapper.util'

export function feedbackCommentsFhirToInternalComments(fhir: FeedbackFHIR): FeedbackCommentsInternal {
    return {
        userId: userIdFromReference(fhir.subject.reference),
        comments: answersToComments(fhir.component),
        timestamp: fhir.effectiveDateTime,
        status: statusToEnum(fhir.status),
    } as FeedbackCommentsInternal
}

function answersToComments(answers: Answer[]): Comment[] {
    try {
        return answers.map((answer) => ({ activity: answer.code.text, text: answer.valueString } as Comment))
    } catch (error) {
        throw new Error(`Failed to map answers to comments: ${error.message}`)
    }
}
