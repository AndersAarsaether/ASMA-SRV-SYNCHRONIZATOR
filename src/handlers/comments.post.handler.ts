import { FeedbackFHIR } from '../schemas/feedback'
import { FHIRFeedbackToComments } from '../mappers/comments.mapper'
import { storeFeedbackComments } from '../proxy/advoca.proxy'

export default function handlePostComments(feedback: FeedbackFHIR): void {
    const comments = FHIRFeedbackToComments(feedback)
    storeFeedbackComments(comments)
}
