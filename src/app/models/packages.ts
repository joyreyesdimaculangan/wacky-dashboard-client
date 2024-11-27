import { PackageInclusions } from './packageInclusions';
import { PackageAddOns } from './packageAddOns';

export interface PackageName {
  packageId: string;
  packageName: string;
}

export interface Packages {
  packageID: string;
  name: string;
  description: string;
  image_url: string;
  inclusions: PackageInclusions[];
  addOns: PackageAddOns[];
  availableAddOns: PackageAddOns[];
  loading: boolean;
}

export interface ViewPackages {
  packageID: string;
  name: string;
  description: string;
  image_url: string;
  availableAddOns?: AvailableAddOns[];
  Inclusion?: Inclusion[];
}

export interface AvailableAddOns {
  addOnID: string;
  name: string;
  packageID: string;
  price: number;
}

export interface Inclusion {
  id: string;
  name: string;
  packageID: string;
}
