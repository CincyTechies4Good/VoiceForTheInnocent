export class Resource {
    resourceType: string;
    name: string;
    hasLocation: boolean;
    isMandatoryReporter: boolean;
    addresses: Address[]; // user can have one or more addresses
    website: string;
    phoneEmergency: string;
    phoneNonEmergency: string;
    email: string;
    //temporary additions to match resources.json type
    phone: string;
    city: string;
    state: string;
}

export class Address {
    streetAddress: string;
    streetAddress2: string;
    city: string;
    state: string;
    zipCode: number;
}
