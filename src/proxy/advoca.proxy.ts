import { Ratings } from '../types/ratings'
import { Comments } from '../types/comments'

export function storeFeedbackRatings(ratings: Ratings): void {
    console.log(`Ratings stored: ${JSON.stringify(ratings)}`)
}

export function storeFeedbackComments(comments: Comments): void {
    console.log(`Comments stored: ${JSON.stringify(comments)}`)
}
