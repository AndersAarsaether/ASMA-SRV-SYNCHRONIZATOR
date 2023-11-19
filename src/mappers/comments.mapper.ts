import { statusToEnum } from '../enums/status'
import { FeedbackFHIR, Answer } from '../model-partners/feedback.model'
import { Comments, Comment } from '../model-advoca/comments.model'
import { userIdFromReference } from '../util/mapper.util'

export function FHIRCommentsToComments(fhir: FeedbackFHIR): Comments {
    return {
        userId: userIdFromReference(fhir.subject.reference),
        comments: answersToComments(fhir.component),
        timestamp: fhir.effectiveDateTime,
        status: statusToEnum(fhir.status),
    } as Comments
}

function answersToComments(answers: Answer[]): Comment[] {
    try {
        return answers.map((answer) => ({ activity: answer.code.text, text: answer.valueString } as Comment))
    } catch (error) {
        throw new Error(`Failed to map answers to comments: ${error.message}`)
    }
}
