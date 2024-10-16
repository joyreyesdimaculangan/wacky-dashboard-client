import { PackageInclusions } from './packageInclusions';
import { PackageAddOns } from './packageAddOns';

export interface Packages {
  packageID: string;
  name: string;
  description: string;
  image_url: string;
  inclusions: PackageInclusions[];
  addOns: PackageAddOns[];
  additionalInclusions: PackageInclusions[];
}

export interface ViewPackages {
  packageID: string;
  name: string;
  description: string;
  image_url: string;
  availableAddOns: availableAddOns[];
  Inclusion: Inclusion[];
}

export interface availableAddOns {
  addOnID: string;
  name: string;
  packageID: string;
}

export interface Inclusion {
  id: string;
  name: string;
  packageID: string;
}
