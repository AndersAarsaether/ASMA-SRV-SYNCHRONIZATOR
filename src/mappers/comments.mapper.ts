import { FeedbackFHIR, Answer } from '../model-partners/feedback.model'
import { Comments, Comment } from '../model-advoca/comments.model'
import { userIdFromReference } from '../utils/mapper.util'
import { getPartnerFromString } from '../utils/partner.util'
import { getStatusFromString } from '../utils/status.util'

export function FHIRCommentsToComments(fhir: FeedbackFHIR): Comments {
    return {
        userId: userIdFromReference(fhir.subject.reference),
        partner: getPartnerFromString(fhir.performer.identifier.value),
        comments: answersToComments(fhir.component),
        timestamp: fhir.effectiveDateTime,
        status: getStatusFromString(fhir.status),
    } as Comments
}

function answersToComments(answers: Answer[]): Comment[] {
    try {
        return answers.map((answer) => ({ activity: answer.code.text, text: answer.valueString } as Comment))
    } catch (error) {
        throw new Error(`Failed to map answers to comments: ${error.message}`)
    }
}
