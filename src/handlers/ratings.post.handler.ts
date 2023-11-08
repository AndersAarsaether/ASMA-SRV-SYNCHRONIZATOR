import { FeedbackFHIR } from '../model-external/feedback.model'
import { feedbackRatingsFhirToInternalRatings } from '../mappers/ratings.mapper'
import { storeFeedbackRatings } from '../proxy/internal.proxy'

export default function handlePostRatings(feedback: FeedbackFHIR): void {
    try {
        const ratings = feedbackRatingsFhirToInternalRatings(feedback)
        storeFeedbackRatings(ratings)
    } catch (error) {
        throw error
    }
}
