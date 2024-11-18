import { GetPackageNameService } from '../features/customer/reservation-form/getPackageName.service';
import { PackageName, ViewPackages } from './packages';

export interface ReservationForm {
    numberOfPax: number,
    name: string,
    contactNumber: string,
    eventDate: string,
    eventTime: string,
    eventTheme: string,
    cakeTheme: string,
    otherRequest: string,
    packageID: PackageName | null | undefined,
    packageName: PackageName | null | undefined
    accountProfileId: string | null | undefined,
    status: 'Pending' | 'Approved' | 'Cancelled' 
    paymentStatus: 'PENDING' | 'PARTIALLY_PAID' | 'PAID'
    addOnIds: string[],
}

export interface EditedReservationForm {
    reservationID: string,
    numberOfPax: number,
    name: string,
    contactNumber: string,
    eventDate: string,
    eventTime: string,
    eventTheme: string,
    cakeTheme: string,
    otherRequest: string,
    packageID: PackageName | null | undefined,
    packageName: PackageName | null | undefined,
    package?: ViewPackages,
    accountProfileId: string | null | undefined,
    status: 'Pending' | 'Approved' | 'Cancelled' 
    paymentStatus: 'PENDING' | 'PARTIALLY_PAID' | 'PAID'
    addOnIds: string[],
}
  