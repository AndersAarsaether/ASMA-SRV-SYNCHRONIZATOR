export function userIdFromReference(reference: string): string {
    const typeAndUserId = reference.split('/')

    if (typeAndUserId.length !== 2 || !typeAndUserId[1]) {
        throw new Error(`Invalid subject reference: ${reference}`)
    } else {
        return typeAndUserId[1]
    }
}
