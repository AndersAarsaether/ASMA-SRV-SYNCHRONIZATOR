import { FeedbackFHIR } from '../schemas/feedback'
import { FHIRFeedbackToRatings } from '../mappers/ratings.mapper'
import { storeFeedbackRatings } from '../proxy/advoca.proxy'

export default function handlePostRatings(feedback: FeedbackFHIR): void {
    const ratings = FHIRFeedbackToRatings(feedback)
    storeFeedbackRatings(ratings)
}
