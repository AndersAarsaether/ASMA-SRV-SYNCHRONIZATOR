import { ZodError } from 'zod'

import type ErrorWithCode from '../types/errorWithCode'

// Function to create an error object that conforms to the ErrorWithCode interface
export function createErrorWithCode(statusCode: number): ErrorWithCode {
    const error = new Error('HTTP error') as ErrorWithCode
    error.statusCode = statusCode
    return error
}

export function isErrorWithCode(error: Error): boolean {
    return typeof error === 'object' && error !== null && 'statusCode' in error
}

export function getZodTypeErrors(error: ZodError): string[] {
    return error.errors.map((e) =>
        e.message === 'Required' ? `Missing required field: ${e.path.join('/')}` : e.message,
    )
}
