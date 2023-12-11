import HttpError from '../errors/httpError'
import { ZodError } from 'zod'

// Function to create an error object that conforms to the HttpError interface
export function createHttpError(statusCode: number): HttpError {
    const error = new Error('HTTP error') as HttpError
    error.statusCode = statusCode
    return error
}

export function isHttpError(error: Error): boolean {
    return typeof error === 'object' && error !== null && 'statusCode' in error
}

export function getZodTypeErrors(error: ZodError): string[] {
    return error.errors.map((e) =>
        e.message === 'Required' ? `Missing required field ${e.path.join('/')}` : e.message,
    )
}
