import { RatingsFHIR, Ratings } from '../schemas/ratings'

export function FHIRFeedbackToRatings(fhirRatings: RatingsFHIR): Ratings {
    const ratings: Ratings = {
        userId: fhirRatings.subject.identifier.value,
        partner: fhirRatings.performer[0]!.identifier.value,
        range: {
            min: fhirRatings.referenceRange[0]!.low.value,
            max: fhirRatings.referenceRange[0]!.high.value,
        },
        scores: fhirRatings.component.map((comp) => {
            return {
                activity: comp.code.text,
                score: comp.valueInteger,
            }
        }),
        timestamp: fhirRatings.effectiveDateTime,
        status: fhirRatings.status,
    }

    return ratings
}
