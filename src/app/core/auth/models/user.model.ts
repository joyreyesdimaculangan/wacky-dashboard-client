export interface AccountProfile {
  accountID: string;
  name: string;
  contactNo: string;
  address: string;
  userId?: string;
  socialMediaId?: string;
}

export interface User {
  userId: string;
  email: string;
  password: string;
  account_type: string;
  accountProfile?: AccountProfile; // Optional to allow lazy loading or if the profile may not always be present
}
