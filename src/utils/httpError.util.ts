import HttpError from '../types/httpError'

// Function to create an error object that conforms to the HttpError interface
export function createHttpError(statusCode: number): HttpError {
    const error = new Error('HTTP error') as HttpError
    error.statusCode = statusCode
    return error
}

export function isHttpError(error: Error): boolean {
    return typeof error === 'object' && error !== null && 'statusCode' in error
}
