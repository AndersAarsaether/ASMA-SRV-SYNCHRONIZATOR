export interface FeedbackFHIR {
    resourceType: string
    status: string
    code: Code
    subject: Subject
    performer: Organization
    effectiveDateTime: string
    // Only relevant if the feedback is a activity-ratings
    referenceRange?: [ReferenceRange]
    component: [Answer]
}

export interface Code {
    text: string
}

export interface Subject {
    reference: string
}

export interface Organization {
    reference: string
    identifier: StringValue
    display: string
}

export interface ReferenceRange {
    low: NumberValue
    high: NumberValue
}

export interface NumberValue {
    value: number
}

export interface StringValue {
    value: string
}

export interface Answer {
    code: Code
    // If the feedback is a activity-ratings
    valueInteger?: number
    // If the feedback is a activity-comments
    valueString?: string
}
