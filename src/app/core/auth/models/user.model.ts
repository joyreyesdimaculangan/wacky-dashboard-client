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
  accountProfileName: string;
  account?: AccountProfile,
  isEmailVerified: boolean, // Optional to allow lazy loading or if the profile may not always be present
}
