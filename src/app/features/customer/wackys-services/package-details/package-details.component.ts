import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject, OnInit, Input } from '@angular/core';
import { ReservationFormComponent } from "../../reservation-form/reservation-form.component";
import { RouterModule } from '@angular/router';
import { PackagesService } from '../../../../services/packages.service';
import { Packages, ViewPackages } from '../../../../models/packages';
import { PackageInclusions } from '../../../../models/packageInclusions';
import { PackageInclusionsService } from '../../../../services/packageInclusions.service';
import { PackageAddOnsService } from '../../../../services/packageAddOns.service';
import { PackageAddOns } from '../../../../models/packageAddOns';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [CommonModule, ReservationFormComponent, RouterModule],
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'], 
})
export class PackageDetailsComponent implements OnInit {
  public cdr = inject(ChangeDetectorRef);
  private readonly additionalInclusionsService = inject(PackageInclusionsService);
  private readonly packageAddOnsService = inject(PackageAddOnsService);
  private readonly packagesService = inject(PackagesService);
  
  public packageInclusions: PackageInclusions[] = [];
  public packagesAddOns: PackageAddOns[] = [];
  packageData: ViewPackages | null = null; // Define a property to store the fetched package data

  isOpen: boolean = false;

  ngOnInit(): void {
    this.getPackageInclusions();
    this.getPackageAddOns();
    // this.getPackageData(); // Fetch package data on initialization
  }

  getPackageInclusions() {
    this.additionalInclusionsService.getInclusions().subscribe((data: PackageInclusions[]) => {
      this.packageInclusions = data;
    });
  }

  getPackageAddOns() {
    this.packageAddOnsService.getAddOns().subscribe((data: PackageAddOns[]) => {
      this.packagesAddOns = data;
    });
  }

  // getPackageData() {
  //   this.packagesService.getPackages().subscribe((data: Packages) => {
  //     // Assuming additionalInclusions and addOns are arrays of IDs or strings
  //     this.packageData = {
  //       ...data,
  //       additionalInclusions: data.additionalInclusions.map(packageID => 
  //         this.packageInclusions.find(inclusion => inclusion.id.toString() === packageID.toString()) || { id: '', name: '', packageID: '' }
  //       ),
  //       addOns: data.addOns.map(packageID => 
  //         this.packagesAddOns.find(addOn => addOn.addOnID.toString() === packageID.toString()) || { addOnID: '', name: '', packageID: '' }
  //       )
  //     };
  //     this.cdr.detectChanges(); // Trigger change detection to update the view
  //   });
  // }

  openModal(selectedPackage: ViewPackages) {
    // Fetch the selected package details from the service
    this.packagesService.getPackageById(selectedPackage.packageID).subscribe((data: ViewPackages) => {
      // Map the additionalInclusions and addOns correctly
      this.packageData = data;
  
      // Open the modal and trigger change detection
      this.packageData = selectedPackage;
      this.isOpen = true;
      this.cdr.detectChanges(); // Trigger change detection to update the view with the selected package data
    });
  }
  
  closeModal() {
    this.isOpen = false;
  }

  // toggleAdditionalInclusion(inclusion: PackageInclusions) {
  //   if (this.packageData) {
  //     const index = this.packageData.additionalInclusions.findIndex(item => item.id === inclusion.id);
  //     if (index > -1) {
  //       this.packageData.additionalInclusions.splice(index, 1); 
  //     } else {
  //       this.packageData.additionalInclusions.push(inclusion); 
  //     }
  //   }
  // }
}