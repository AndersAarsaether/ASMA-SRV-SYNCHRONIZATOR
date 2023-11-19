import { FeedbackFHIR } from '../model-partners/feedback.model'
import { FHIRCommentsToComments } from '../mappers/comments.mapper'
import { storeFeedbackComments } from '../proxy/advoca.proxy'

export default function handlePostComments(feedback: FeedbackFHIR): void {
    try {
        const comments = FHIRCommentsToComments(feedback)
        storeFeedbackComments(comments)
    } catch (error) {
        throw error
    }
}
