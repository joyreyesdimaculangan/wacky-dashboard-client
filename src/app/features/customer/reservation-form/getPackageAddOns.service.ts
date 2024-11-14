import { Injectable, signal } from '@angular/core';

interface PackageDetails {
  packageId: string;
  addOns: string[];
}

@Injectable({
  providedIn: 'root'
})

export class GetPackageAddOnsService {
  packageDetails = signal<string[]>([]);
  addOnsId = signal<string[]>([]);

  setAddOnsId(addOnsId: string[]): void {
    this.addOnsId.set(addOnsId);
  }

  setPackageDetails(packageDetail:string[]): void {
    this.packageDetails.update(values => {
      return [...values, ...packageDetail];
    });
  }

  getPackageDetails(): string[] {
    return this.packageDetails();
  }
}
