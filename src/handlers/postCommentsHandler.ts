import { FeedbackFHIR } from './../model-external/feedbackFHIR'
import { feedbackCommentsFhirToInternalComments } from './../mappers/feedbackComments.mapper'
import { storeFeedbackComments } from '../proxy/adVocaProxy'

export default function handlePostComments(feedback: FeedbackFHIR): void {
    try {
        const comments = feedbackCommentsFhirToInternalComments(feedback)
        storeFeedbackComments(comments)
    } catch (error) {
        throw error
    }
}
