export function shouldRetry(statuscode: number): boolean {
    const retryableCodes = [408, 425, 429, 500, 502, 503, 504]
    return retryableCodes.includes(statuscode)
}
