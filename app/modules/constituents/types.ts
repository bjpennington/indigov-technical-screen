export interface Constituent {
  email: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: Date;
  lastUpdated: Date;
}

export interface Constituents {
  [email: string]: Constituent;
}
