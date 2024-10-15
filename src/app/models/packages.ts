

import { PackageInclusions } from './packageInclusions';
import { PackageAddOns } from './packageAddOns';

export interface Packages { 
    packageID: string,
    name: string,
    description: string,
    image_url: string,
    additionalInclusions: PackageInclusions[];
    addOns: PackageAddOns[];
}
