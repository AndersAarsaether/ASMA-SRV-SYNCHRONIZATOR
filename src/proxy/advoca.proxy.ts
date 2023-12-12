import { Ratings } from '../schemas/ratings'
import { Comments } from '../schemas/comments'

export function storeFeedbackRatings(ratings: Ratings): void {
    console.log(`Ratings stored: ${JSON.stringify(ratings)}`)
}

export function storeFeedbackComments(comments: Comments): void {
    console.log(`Comments stored: ${JSON.stringify(comments)}`)
}
