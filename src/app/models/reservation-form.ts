export interface ReservationForm {
    numberOfPax: number,
    packageType: string,
    name: string,
    contactNumber: string,
    eventDate: string,
    eventTime: string,
    eventTheme: string,
    cakeTheme: string,
    otherRequest: string,
    packageID: string,
    accountProfileId: string,
    status: 'Pending' | 'Approved' | 'Cancelled' 
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED'
    addOnIds: string[],
}
  