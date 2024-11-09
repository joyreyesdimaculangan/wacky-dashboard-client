import { Injectable, signal } from '@angular/core';

interface PackageName {
  packageId: string;
  packageName: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetPackageNameService {
  packageName = signal<PackageName | null>(null);

  setPackageName(packageId: string, packageName: string): void {
    this.packageName.set({ packageId, packageName });
  }
  
  getPackageName(): PackageName | null {
    return this.packageName();
  }
}
