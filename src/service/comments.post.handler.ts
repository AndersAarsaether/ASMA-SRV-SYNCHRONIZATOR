import { CommentsFHIR } from '../schemas/comments'
import { FHIRCommentsToComments } from '../mappers/comments.mapper'
import { storeFeedbackComments } from '../proxy/advoca.proxy'

export default function handlePostComments(fhirComments: CommentsFHIR): void {
    const comments = FHIRCommentsToComments(fhirComments)
    storeFeedbackComments(comments)
}
