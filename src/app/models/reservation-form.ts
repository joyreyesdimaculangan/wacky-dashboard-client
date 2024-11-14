export interface ReservationForm {
    numberOfPax: number,
    name: string,
    contactNumber: string,
    eventDate: string,
    eventTime: string,
    eventTheme: string,
    cakeTheme: string,
    otherRequest: string,
    packageID: string | null | undefined,
    accountProfileId: string | null | undefined,
    status: 'Pending' | 'Approved' | 'Cancelled' 
    paymentStatus: 'PENDING' | 'PAID' | 'FAILED'
    addOnIds: string[],
}
  