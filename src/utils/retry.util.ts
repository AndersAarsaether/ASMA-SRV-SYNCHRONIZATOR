const retryableCodes = [408, 425, 429, 500, 502, 503, 504]

export function shouldRetry(statuscode: number): boolean {
    return retryableCodes.includes(statuscode)
}
