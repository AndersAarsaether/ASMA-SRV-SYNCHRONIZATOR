export default interface errorWithCode extends Error {
    statusCode: number
}
