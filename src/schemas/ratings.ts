import { z } from 'zod'
import Status from '../enums/status'
import Partner from '../enums/partner'

export const RatingsFHIRSchema = z.object({
    resourceType: z.literal('Observation'),
    code: z.object({
        text: z.literal('activity-ratings'),
    }),
    status: z.nativeEnum(Status).optional(),
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
            z
                .object({
                    low: z.object({ value: z.number() }),
                    high: z.object({ value: z.number() }),
                })
                .refine((data) => data.low.value < data.high.value, {
                    message: 'low must be lower than high',
                }),
        )
        .length(1),
    component: z
        .array(
            z.object({
                code: z.object({
                    text: z.string(),
                }),
                valueInteger: z.number(),
            }),
        )
        .min(1),
})

export type RatingsFHIR = z.infer<typeof RatingsFHIRSchema>

export const RatingsSchema = z.object({
    userId: z.string(),
    partner: z.nativeEnum(Partner),
    range: z
        .object({
            min: z.number(),
            max: z.number(),
        })
        .refine((data) => data.min < data.max, {
            message: 'min must be less than max',
        }),
    scores: z.array(
        z.object({
            activity: z.string(),
            score: z.number(),
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

export type Ratings = z.infer<typeof RatingsSchema>
