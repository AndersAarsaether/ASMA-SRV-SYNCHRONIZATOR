import { UserFHIR } from '../model-external/userFHIR'

export function postUser(user: UserFHIR) {
    console.log(`User posted: ${JSON.stringify(user)}`)
}
