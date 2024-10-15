import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { ReservationFormComponent } from "../../reservation-form/reservation-form.component";
import { RouterModule } from '@angular/router';
import { PackagesService } from '../../../../services/packages.service';
import { Packages } from '../../../../models/packages';
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
  private readonly additionalInclusions = inject(PackageInclusionsService);
  private readonly packageAddOns = inject(PackageAddOnsService);
  private readonly packagesService = inject(PackagesService);
  
  public packageInclusions: PackageInclusions[] = [];
  public packagesAddOns: PackageAddOns[] = [];
  public packageData: Packages | null = null; // Define a property to store the fetched package data

  isOpen: boolean = false;

  ngOnInit(): void {
    this.getPackageInclusions();
    this.getPackageAddOns();
    this.getPackageData(); // Fetch package data on initialization
  }

  getPackageInclusions() {
    this.additionalInclusions.getInclusions().subscribe((data: any) => {
      this.packageInclusions = data;
    });
  }

  getPackageAddOns() {
    this.packageAddOns.getAddOns().subscribe((data: any) => {
      this.packagesAddOns = data;
    });
  }

  getPackageData() {
    this.packagesService.getPackages().subscribe((data: Packages) => {
      this.packageData = data;
      this.cdr.detectChanges(); // Trigger change detection to update the view
    });
  }

  openModal(offer: any) {
    this.packageData = { 
      ...offer,
      additionalInclusions: offer.additionalInclusions || [], // Initialize additional inclusions
      availableInclusions: offer.availableInclusions || [] // Ensure available inclusions are also initialized
    };
    this.isOpen = true;
    this.cdr.detectChanges();
  }


  closeModal() {
    this.isOpen = false;
  }

  toggleAdditionalInclusion(inclusion: PackageInclusions) {
    if (this.packageData) {
      const index = this.packageData.additionalInclusions.indexOf(inclusion);
      if (index > -1) {
        this.packageData.additionalInclusions.splice(index, 1); 
      } else {
        this.packageData.additionalInclusions.push(inclusion); 
      }
    }
  }
}