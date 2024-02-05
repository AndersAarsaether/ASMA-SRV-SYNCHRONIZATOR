import type { Request, Response } from 'express'
import { ZodError } from 'zod'

import type { CommentsFHIR } from '../schemas/comments'
import { FHIRCommentsToComments } from '../mappers/comments.mapper'
import { storeFeedbackComments } from '../proxy/advoca.proxy'
import type { ErrorResponse, SuccessResponse } from '../types/responses'
import { getZodTypeErrors } from '../utils/error.util'

export default function handlePostComments(req: Request, res: Response): void {
    try {
        const commentsFHIR: CommentsFHIR = req.body
        const comments = FHIRCommentsToComments(commentsFHIR)
        storeFeedbackComments(comments)
        const response: SuccessResponse = { message: 'Successfully stored the comments' }
        res.status(200).json(response)
    } catch (error) {
        const description = error?.message as string
        const response: ErrorResponse = {
            message: 'Failed to store the comments',
            errors: error instanceof ZodError ? getZodTypeErrors(error) : [description],
        }
        res.status(500).json(response)
    }
}
