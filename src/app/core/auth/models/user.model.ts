export interface AccountProfile {
  accountID: string;
  accountProfileName: string;
  contactNo: string;
  address: string;
  userId?: string;
}

export interface User {
  userId: string;
  email: string;
  password: string;
  account_type: string;
  accountProfileId: string;
  account?: AccountProfile, // Optional to allow lazy loading or if the profile may not always be present
}
