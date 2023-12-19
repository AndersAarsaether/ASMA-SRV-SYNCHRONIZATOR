import { z } from 'zod'
import Status from '../enums/status'
import Partner from '../enums/partner'

export const CommentsFHIRSchema = z.object({
    resourceType: z.literal('Observation'),
    status: z.nativeEnum(Status),
    subject: z.object({
        identifier: z.object({
            value: z.string(),
        }),
    }),
    performer: z
        .array(
            z.object({
                identifier: z.object({
                    value: z.nativeEnum(Partner),
                }),
            }),
        )
        .length(1),
    effectiveDateTime: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
            'Invalid ISO 8601 timestamp format',
        ),
    component: z
        .array(
            z.object({
                code: z.object({
                    text: z.string(),
                }),
                valueString: z.string(),
            }),
        )
        .min(1),
})

export type CommentsFHIR = z.infer<typeof CommentsFHIRSchema>

export const CommentsSchema = z.object({
    userId: z.string(),
    partner: z.nativeEnum(Partner),
    comments: z.array(
        z.object({
            activity: z.string(),
            text: z.string(),
        }),
    ),
    timestamp: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
            'Invalid ISO 8601 timestamp format',
        ),
    status: z.nativeEnum(Status),
})

export type Comments = z.infer<typeof CommentsSchema>
