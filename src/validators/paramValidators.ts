import { Request, Response, NextFunction } from 'express'
import { isValidPartnerString } from '../utils/partner.util'

export function chechPartnerParameter(req: Request, res: Response, next: NextFunction): void {
    // Get partner parameter
    const partnerParam = req.query.partner as string
    // Check if partner parameter was provided
    if (!partnerParam) {
        res.status(400).json({ message: 'Bad Request', error: 'Missing search parameter: partner' })
        return
    }
    // Check if parameter contains valid partner
    const validPartner = isValidPartnerString(partnerParam)
    // If invalid, return error
    if (!validPartner) {
        res.status(400).json({ message: 'Bad Request', error: `${partnerParam} is not a valid partner` })
        return
    }
    // If the partner parameter is OK, proceed to next middleware function
    next()
}
