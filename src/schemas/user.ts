import { z } from 'zod'

export const UserFHIRSchema = z.object({
    resourceType: z.literal('Patient'),
    identifier: z.tuple([
        z.object({
            type: z.object({
                text: z.literal('userId'),
            }),
            value: z.string(),
        }),
        z.object({
            type: z.object({
                text: z.literal('groupId'),
            }),
            value: z.string(),
        }),
    ]),
    name: z.array(z.object({ text: z.string().regex(/^[^0-9]*$/) })).length(1),
    contact: z
        .array(
            z.object({
                organization: z.object({
                    identifier: z.object({
                        type: z.object({
                            text: z.literal('institutionId'),
                        }),
                        value: z.string(),
                    }),
                }),
                period: z.object({
                    start: z
                        .string()
                        .regex(
                            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
                            'Invalid ISO 8601 timestamp format for start of period',
                        ),
                    end: z
                        .string()
                        .regex(
                            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
                            'Invalid ISO 8601 timestamp format for end of period',
                        )
                        .optional(),
                }),
            }),
        )
        .length(1),
})

export type UserFHIR = z.infer<typeof UserFHIRSchema>

export const UserSchema = z
    .object({
        userId: z.string(),
        groupId: z.string(),
        instId: z.string(),
        firstName: z.string().regex(/^[^0-9]*$/),
        arrivalDate: z
            .string()
            .regex(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
                'Invalid ISO 8601 timestamp format for arrivalDate',
            ),
        departureDate: z
            .string()
            .regex(
                /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
                'Invalid ISO 8601 timestamp format for departureDate',
            )
            .optional(),
    })
    .refine((user) => !user.departureDate || new Date(user.arrivalDate) < new Date(user.departureDate), {
        message: 'The departureDate must be after the arrivalDate',
    })

export type User = z.infer<typeof UserSchema>
