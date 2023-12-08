import { FeedbackFHIR } from '../schemas/feedback'
import { Comments, Comment } from '../types/comments'
import { getPartnerFromFHIR, getStatusFromFHIR, getTimestampFromFHIR, getUserIdFromFHIR } from '../utils/mapper.util'

function getScoresFromFHIR(fhir: FeedbackFHIR): Comment[] {
    try {
        return fhir.component.map((answer) => ({ activity: answer.code.text, text: answer.valueString } as Comment))
    } catch (error) {
        throw new Error(`Failed to map answers to ratings: ${error.message}`)
    }
}

export function FHIRFeedbackToRComments(fhir: FeedbackFHIR): Comments {
    const comments: Comments = {
        userId: getUserIdFromFHIR(fhir),
        partner: getPartnerFromFHIR(fhir),
        comments: getScoresFromFHIR(fhir),
        timestamp: getTimestampFromFHIR(fhir),
        status: getStatusFromFHIR(fhir),
    }

    return comments
}
