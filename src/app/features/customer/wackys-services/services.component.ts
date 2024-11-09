import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';
import { PackageDetailsComponent } from './package-details/package-details.component';
import { PackagesCrmComponent } from '../../admin/admin-crm/packages-crm/createAddedPackages/packages-crm.component';
import { PackagesService } from '../../../services/packages.service';
import { Packages, ViewPackages } from '../../../models/packages';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DeleteOffersComponent } from '../../admin/admin-crm/menu-crm/deleteMenu/delete-offers.component';
import { forkJoin } from 'rxjs';
import { DeletePackagesComponent } from '../../admin/admin-crm/packages-crm/deletePackages/delete-packages/delete-packages.component';
import { GetPackageAddOnsService } from '../reservation-form/getPackageAddOns.service';
import { GetPackageNameService } from '../reservation-form/getPackageName.service';
import { effect as angularEffect } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';
declare const Flowbite: any;

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    InquiryFormComponent,
    PackageDetailsComponent,
    PackagesCrmComponent,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  private readonly packageService = inject(PackagesService);
  private readonly packageDetails = inject(GetPackageNameService)
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly authService = inject(AuthService);
  public selectedItems: Set<string> = new Set<string>();
  public packages: Packages[] = [];
  userRole: string | null = null;

  @ViewChild('packageModal') packageModal!: PackageDetailsComponent;

  ngOnInit(): void {
    this.getPackages();
    this.userRole = this.authService.getUserRole();
  }

  pushPackageName(packageId: string, packageName: string): void {
    this.packageDetails.setPackageName(packageId, packageName);
    this.packageDetails.getPackageName();
    console.log(this.packageDetails.packageName());
  }


  getPackages() {
    this.packageService.getPackages().subscribe((data: Packages[]) => {
      this.packages = data;
    });
  }

  openPackageModal(offer: any) {
    this.packageModal.openModal(offer);
  }

  closePackageModal() {
    this.packageModal.closeModal();
  }

  deletePackage(packageID: string) {
    const matdialogRef = this.dialog.open(DeletePackagesComponent, {
      data: { message: 'Are you sure you want to delete this package? This action is irreversible and cannot be undone.' }
    });

    matdialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.packageService.deletePackage(packageID).subscribe(() => {
          console.log('Packages deleted successfully', packageID);
          this.getPackages(); 
          this.snackBar.open('Package deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar-success']
          });
        });
      } else (error: any) => {
        console.error('Error deleting selected items:', error);
        this.snackBar.open('Failed to delete selected items.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-error']
        });
      }
    });
  }

  toggleSelection(packageID: string) {
    if (this.selectedItems.has(packageID)) {
      this.selectedItems.delete(packageID);
    } else {
      this.selectedItems.add(packageID);
    }
  }

  isSelected(packageID: string): boolean {
    this.selectedItems.has(packageID);
    return false;
  }

  deleteSelectedItems() {
    const dialogRef = this.dialog.open(DeleteOffersComponent, {
      data: { message: 'Are you sure you want to delete the selected items? This action is irreversible and cannot be undone.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deleteObservables = Array.from(this.selectedItems).map(packageID =>
          this.packageService.deletePackage(packageID)
        );

        forkJoin(deleteObservables).subscribe(() => {
          console.log('Selected items deleted successfully');
          this.getPackages(); 
          this.selectedItems.clear(); 
          this.snackBar.open('Selected items deleted successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-success']
          });
        });
      } else (error: any) => {
        console.error('Error deleting selected items:', error);
        this.snackBar.open('Failed to delete selected items.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-error']
        });
      }
    });
  }

  deleteAllItems() {
    const dialogRef = this.dialog.open(DeletePackagesComponent, {
      data: { message: 'Are you sure you want to delete all items? This action is irreversible and cannot be undone.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deleteObservables = this.packages.map(packages =>
          this.packageService.deletePackage(packages.packageID.toString())
        );

        forkJoin(deleteObservables).subscribe(() => {
          console.log('All items deleted successfully');
          this.getPackages(); 
          this.selectedItems.clear(); 
          this.snackBar.open('All items deleted successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-success']
          });
        });
      } else (error: any) => {
        console.error('Error deleting selected items:', error);
        this.snackBar.open('Failed to delete selected items.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-error']
        });
      }
    });
  }
}
function effect(arg0: () => void) {
  throw new Error('Function not implemented.');
}

