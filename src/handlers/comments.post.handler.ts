import { FeedbackFHIR } from '../model-external/feedback.model'
import { feedbackCommentsFhirToInternalComments } from '../mappers/comments.mapper'
import { storeFeedbackComments } from '../proxy/adVoca.proxy'

export default function handlePostComments(feedback: FeedbackFHIR): void {
    try {
        const comments = feedbackCommentsFhirToInternalComments(feedback)
        storeFeedbackComments(comments)
    } catch (error) {
        throw error
    }
}
