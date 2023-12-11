import { CommentsFHIR, Comments, CommentsSchema } from '../schemas/comments'

export function FHIRCommentsToComments(fhirComments: CommentsFHIR): Comments {
    const object = {
        userId: fhirComments.subject.identifier.value,
        partner: fhirComments.performer[0]!.identifier.value,
        comments: fhirComments.component.map((comp) => {
            return {
                activity: comp.code.text,
                text: comp.valueString,
            }
        }),
        timestamp: fhirComments.effectiveDateTime,
        status: fhirComments.status,
    }

    return CommentsSchema.parse(object)
}
