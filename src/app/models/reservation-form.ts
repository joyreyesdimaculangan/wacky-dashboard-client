export interface ReservationForm {
    numberOfPax: number,
    packageType: string,
    name: string,
    contactNumber: string,
    eventDate: string,
    eventTime: string,
    eventTheme: string,
    cakeTheme: string,
    cakeMessage: string,
    otherRequest: string,
    packageID: string,
    accountProfileId: string,
    status: 'Pending' | 'Approved' | 'Cancelled' 
}
  