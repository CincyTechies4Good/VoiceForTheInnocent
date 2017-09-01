export interface Resource {
    resourceType: string;
    resourceName: string; // required field with minimum 5 characters
    website: string;
    phoneEmergency: number;
    phoneNonEmergency: number;
    emailAddress: string;
    hasLocation: boolean;
    addresses: Address[]; // user can have one or more addresses
    isMandatoryReporter: boolean;
}

export interface Address {
    streetAddress: string;
    streetAddress2: string;
    city: string;
    state: string;
    zipCode: number;
}