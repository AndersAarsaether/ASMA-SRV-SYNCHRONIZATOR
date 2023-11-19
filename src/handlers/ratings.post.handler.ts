import { FeedbackFHIR } from '../model-partners/feedback.model'
import { FHIRFeedbackToRatings } from '../mappers/ratings.mapper'
import { storeFeedbackRatings } from '../proxy/advoca.proxy'

export default function handlePostRatings(feedback: FeedbackFHIR): void {
    try {
        const ratings = FHIRFeedbackToRatings(feedback)
        storeFeedbackRatings(ratings)
    } catch (error) {
        throw error
    }
}
