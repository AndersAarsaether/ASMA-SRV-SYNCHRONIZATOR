import { z } from 'zod'

import Status from '../enums/status'
import Partner from '../enums/partner'

export const RatingsFHIRSchema = z
    .object({
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
                        low: z.object({ value: z.number().int() }),
                        high: z.object({ value: z.number().int() }),
                    })
                    .refine((data) => data.low.value < data.high.value, {
                        message: 'The low value must be lower than the high value',
                    }),
            )
            .length(1),
        component: z
            .array(
                z.object({
                    code: z.object({
                        text: z.string(),
                    }),
                    valueInteger: z.number().int(),
                }),
            )
            .min(1),
    })
    .refine(
        (data) =>
            data.component.every(
                (feedback) =>
                    data.referenceRange[0] &&
                    feedback.valueInteger < data.referenceRange[0].high.value &&
                    feedback.valueInteger > data.referenceRange[0].low.value,
            ),
        { message: 'Found rating-value outside of the defined reference range' },
    )

export type RatingsFHIR = z.infer<typeof RatingsFHIRSchema>

export const RatingsSchema = z
    .object({
        userId: z.string(),
        partner: z.nativeEnum(Partner),
        range: z
            .object({
                min: z.number().int(),
                max: z.number().int(),
            })
            .refine((data) => data.min < data.max, {
                message: 'The min value must be less than the max value',
            }),
        scores: z.array(
            z.object({
                activity: z.string(),
                score: z.number().int(),
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
    .refine(
        (data) => data.scores.every((feedback) => feedback.score < data.range.max && feedback.score > data.range.min),
        { message: 'Found score outside of the defined range' },
    )

export type Ratings = z.infer<typeof RatingsSchema>
