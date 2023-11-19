import { Ratings } from '../model-advoca/ratings.model'
import { Comments } from '../model-advoca/comments.model'

export function storeFeedbackRatings(ratings: Ratings): void {
    console.log(`Ratings stored: ${JSON.stringify(ratings)}`)
}

export function storeFeedbackComments(comments: Comments): void {
    console.log(`Comments stored: ${JSON.stringify(comments)}`)
}
