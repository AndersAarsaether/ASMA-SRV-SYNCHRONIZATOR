enum Partner {
    Adfectus = 'adfectus',
}

export default Partner

export function partnerToEnum(partner: string): Partner {
    const partnerLowerCase = partner.toLowerCase()

    switch (partnerLowerCase) {
        case 'adfectus':
            return Partner.Adfectus
        default:
            throw new Error('Invalid partner provided')
    }
}
