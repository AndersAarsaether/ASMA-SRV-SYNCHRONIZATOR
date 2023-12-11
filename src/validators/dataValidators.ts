import { ZodError, ZodIssue } from 'zod'
import { FeedbackFHIR, FeedbackFHIRSchema } from '../schemas/feedback'
export function validateAndReturnFHIRFeedback(body: any): FeedbackFHIR {
    const fhirfeedback = FeedbackFHIRSchema.parse(body)

    if (!fhirfeedback.referenceRange && fhirfeedback.code.text === 'activity-ratings') {
        const issue = {
            code: 'custom',
            path: ['referenceRange'],
            message: 'Reference range must be included with ratings',
        } as ZodIssue
        throw new ZodError([issue])
    } else if (fhirfeedback.referenceRange && fhirfeedback.code.text === 'activity-comments') {
        const issue = {
            code: 'custom',
            path: ['referenceRange'],
            message: 'Reference range should not be included with comments',
        } as ZodIssue
        throw new ZodError([issue])
    }

    return fhirfeedback
}
