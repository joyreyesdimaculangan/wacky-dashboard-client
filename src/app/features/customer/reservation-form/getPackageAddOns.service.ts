import { Injectable, signal } from '@angular/core';

interface PackageDetails {
  packageId: string;
  addOnsId: string[];
  addOnsName: string[];
}

@Injectable({
  providedIn: 'root'
})

export class GetPackageAddOnsService {
  packageDetails = signal<string[]>([]);
  addOnsId = signal<string[]>([]);
  addOnsName = signal<PackageDetails | null>(null);

  setAddOnsId(addOnsId: string[]): void {
    this.addOnsId.set(addOnsId);
  }

  setAddOnsName(addOnsId: string[], addOnsName: string[]): void {
    this.addOnsName.set({ packageId: '', addOnsId, addOnsName });
  }

  getAddOnsName(): PackageDetails | null {
    return this.addOnsName();
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
