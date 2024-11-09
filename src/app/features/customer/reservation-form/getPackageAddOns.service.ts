import { Injectable, signal } from '@angular/core';

interface packageDetails {
  packageId: string;
  addOns: string[];
}

@Injectable({
  providedIn: 'root'
})

export class GetPackageAddOnsService {
  packageDetails = signal<string[]>([]);
  
  setPackageDetails(packageDetail:string[]): void {
    this.packageDetails.update(values => {
      return [...values, ...packageDetail];
    });
  }

  getPackageDetails(): string[] {
    return this.packageDetails();
  }
}
