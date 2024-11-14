import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectorRef,
  inject,
  OnInit,
  Input,
  Output,
  EventEmitter,
  effect,
} from '@angular/core';
import { ReservationFormComponent } from '../../reservation-form/reservation-form.component';
import { Router, RouterModule } from '@angular/router';
import { PackagesService } from '../../../../services/packages.service';
import { Packages, ViewPackages } from '../../../../models/packages';
import { PackageInclusions } from '../../../../models/packageInclusions';
import { PackageInclusionsService } from '../../../../services/packageInclusions.service';
import { PackageAddOnsService } from '../../../../services/packageAddOns.service';
import { PackageAddOns } from '../../../../models/packageAddOns';
import { GetPackageAddOnsService } from '../../reservation-form/getPackageAddOns.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-package-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'],
})
export class PackageDetailsComponent implements OnInit {
  @Input() package!: Packages;
  @Output() addOnsSelected = new EventEmitter<string[]>();

  selectedAddOns: string[] = [];

  public cdr = inject(ChangeDetectorRef);
  private readonly additionalInclusionsService = inject(
    PackageInclusionsService
  );
  private readonly authService = inject(AuthService);
  private readonly packageAddOnsService = inject(PackageAddOnsService);
  private readonly packagesService = inject(PackagesService);
  private readonly packageDetails = inject(GetPackageAddOnsService);
  router = inject(Router);

  public packageInclusions: PackageInclusions[] = [];
  public packagesAddOns: PackageAddOns[] = [];
  packageData: ViewPackages | null = null; // Define a property to store the fetched package data
  constructor() {
    effect(() => {
      console.log(this.packageDetails.packageDetails());
    });
  }

  isOpen: boolean = false;

  ngOnInit(): void {
    this.getPackageInclusions();
    this.getPackageAddOns();
  }

  pushAddOn(addOn: string): void {
    this.packageDetails.addOnsId().push(addOn);
    console.log('Add-ons:', this.packageDetails.addOnsId());
  }

  onAddOnChange(addOn: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedAddOns.push(addOn);
    } else {
      const index = this.selectedAddOns.indexOf(addOn);
      if (index > -1) {
        this.selectedAddOns.splice(index, 1);
      }
    }
    this.addOnsSelected.emit(this.selectedAddOns);
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

  reservePackage() {
    console.log('Reserve package:', this.packageData?.packageID);
    console.log(this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/customer/reservations']);
    } else {
      this.router.navigate(['/signInFirst']);
    }
  }
}
