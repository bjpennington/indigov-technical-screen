export interface Constituent {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Constituents {
  [email: string]: Constituent;
}
