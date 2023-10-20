export default interface FeedbackScoreFHIR {
    resourceType: string
    status: string
    code: Code
    subject: Subject
    effectiveDateTime: Date
    referenceRange: [ReferenceRange]
    component: [Answer]
}

interface Code {
    text: string
}

interface Subject {
    reference: string
}

interface ReferenceRange {
    low: number
    high: number
}

interface Answer {
    code: Code
    valueInteger: number
}
