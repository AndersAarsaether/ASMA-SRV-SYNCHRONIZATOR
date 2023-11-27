export interface UserFHIR {
    resourceType: string
    identifier: [TypeValue, TypeValue]
    name: [Type]
    contact: [Contact]
}

export interface TypeValue {
    type: Type
    value: string
}

export interface Type {
    text: string
}

export interface Contact {
    organization: Organization
    period: Period
}

export interface Organization {
    identifier: TypeValue
}

export interface Period {
    start: string
    end: string
}
