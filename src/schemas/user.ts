import { z } from 'zod'

export const UserFHIRSchema = z.object({
    resourceType: z.literal('Patient'),
    identifier: z
        .array(
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
        )
        .length(2),
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
                            'Invalid ISO 8601 timestamp format',
                        ),
                }),
            }),
        )
        .length(1),
})

export type UserFHIR = z.infer<typeof UserFHIRSchema>
