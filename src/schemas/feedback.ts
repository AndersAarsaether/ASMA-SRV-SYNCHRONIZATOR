import { z } from 'zod'
import Status from '../enums/status'
import Partner from '../enums/partner'

export const FeedbackFHIRSchema = z.object({
    resourceType: z.literal('Observation'),
    status: z.nativeEnum(Status),
    code: z.object({
        text: z.enum(['activity-rankings', 'activity-comments']),
    }),
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
    referenceRange: z
        .array(
            z.object({
                low: z.object({ value: z.number() }),
                high: z.object({ value: z.number() }),
            }),
        )
        .length(1),
    component: z
        .array(
            z.object({
                code: z.object({
                    text: z.string(),
                }),
                valueInteger: z.number().optional(),
                valueString: z.string().optional(),
            }),
        )
        .min(1),
})

export type FeedbackFHIR = z.infer<typeof FeedbackFHIRSchema>
