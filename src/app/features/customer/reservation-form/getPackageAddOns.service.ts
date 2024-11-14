import { Injectable, signal } from '@angular/core';

interface packageDetails {
  packageId: string;
  addOns: string[];
}

@Injectable({
  providedIn: 'root'
})

export class GetPackageAddOnsService {
  packageDetails = signal<packageDetails[]>([]);
  addOnsId = signal<packageDetails[]>([]);

  setAddOnsId(addOnsId: packageDetails[]): void {
    this.addOnsId.set(addOnsId);
  }

  setPackageDetails(packageDetail: packageDetails[]): void {
    this.packageDetails.update(values => {
      return [...values, ...packageDetail];
    });
  }

  getPackageDetails(): packageDetails[] {
    return this.packageDetails();
  }

  getAddOnsId(): packageDetails[] {
    return this.addOnsId();
  }
}
