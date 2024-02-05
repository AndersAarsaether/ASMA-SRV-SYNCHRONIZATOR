import type { Request, Response, NextFunction } from 'express'

import { isValidPartnerString } from '../utils/partner.util'
import type { ErrorResponse } from '../types/responses'

export function chechPartnerParameter(req: Request, res: Response, next: NextFunction): void {
    // Get partner parameter
    const partnerParam = req.params.partner as string
    // Check if partner parameter was provided
    if (!partnerParam) {
        const response: ErrorResponse = { message: 'Bad Request', errors: ['Missing search parameter: partner'] }
        res.status(400).json(response)
        return
    }
    // Check if parameter contains valid partner
    const validPartner = isValidPartnerString(partnerParam)
    // If invalid, return error
    if (!validPartner) {
        const response: ErrorResponse = { message: 'Bad Request', errors: [`${partnerParam} is not a valid partner`] }
        res.status(400).json(response)
        return
    }
    // If the partner parameter is OK, proceed to next middleware function
    next()
}
