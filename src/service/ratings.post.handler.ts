import { RatingsFHIR } from '../schemas/ratings'
import { FHIRFeedbackToRatings } from '../mappers/ratings.mapper'
import { storeFeedbackRatings } from '../proxy/advoca.proxy'

export default function handlePostRatings(fhirRatings: RatingsFHIR): void {
    const ratings = FHIRFeedbackToRatings(fhirRatings)
    storeFeedbackRatings(ratings)
}
