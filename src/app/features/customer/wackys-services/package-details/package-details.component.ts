import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectorRef,
  inject,
  OnInit,
  Input,
} from '@angular/core';
import { ReservationFormComponent } from '../../reservation-form/reservation-form.component';
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
  private readonly additionalInclusionsService = inject(
    PackageInclusionsService
  );
  private readonly packageAddOnsService = inject(PackageAddOnsService);
  private readonly packagesService = inject(PackagesService);

  public packageInclusions: PackageInclusions[] = [];
  public packagesAddOns: PackageAddOns[] = [];
  packageData: ViewPackages | null = null; // Define a property to store the fetched package data

  isOpen: boolean = false;

  ngOnInit(): void {
    this.getPackageInclusions();
    this.getPackageAddOns();
  }

  getPackageInclusions() {
    this.additionalInclusionsService
      .getInclusions()
      .subscribe((data: PackageInclusions[]) => {
        this.packageInclusions = data;
      });
  }

  getPackageAddOns() {
    this.packageAddOnsService.getAddOns().subscribe((data: PackageAddOns[]) => {
      this.packagesAddOns = data;
    });
  }

  openModal(selectedPackage: ViewPackages) {
    // Fetch the selected package details from the service
    this.packagesService
      .getPackageById(selectedPackage.packageID)
      .subscribe((data: ViewPackages) => {
        // Map the additionalInclusions and addOns correctly
        this.packageData = data;

        // Open the modal and trigger change detection
        this.packageData = selectedPackage;
        this.isOpen = true;
        this.cdr.detectChanges();
      });
  }

  closeModal() {
    this.isOpen = false;
  }
}
