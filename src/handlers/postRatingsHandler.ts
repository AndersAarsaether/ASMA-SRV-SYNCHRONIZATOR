import { FeedbackFHIR } from './../model-external/feedbackFHIR'
import { feedbackRatingsFhirToInternalRatings } from './../mappers/feedbackRatings.mapper'
import { storeFeedbackRatings } from '../proxy/adVocaProxy'

export function handlePostRatings(feedback: FeedbackFHIR): void {
    try {
        const ratings = feedbackRatingsFhirToInternalRatings(feedback)
        storeFeedbackRatings(ratings)
    } catch (error) {
        throw error
    }
}
