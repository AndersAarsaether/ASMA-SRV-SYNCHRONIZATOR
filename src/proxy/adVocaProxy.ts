import { FeedbackRatingsInternal } from '../model-internal/feedbackRatings'
import { FeedbackCommentsInternal } from '../model-internal/feedbackComments'

export function storeFeedbackRatings(ratings: FeedbackRatingsInternal): void {
    console.log(`Ratings stored: ${JSON.stringify(ratings)}`)
}

export function storeFeedbackComments(comments: FeedbackCommentsInternal): void {
    console.log(`Comments stored: ${JSON.stringify(comments)}`)
}
