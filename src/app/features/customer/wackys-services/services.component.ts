import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InquiryFormComponent } from "../inquiry-form/inquiry-form.component";
import { PackageDetailsComponent } from "./package-details/package-details.component";
import { PackagesCrmComponent } from '../../admin/admin-crm/packages-crm/packages-crm.component';
import { PackagesService } from '../../../services/packages.service';
import { Packages } from '../../../models/packages';
declare const Flowbite: any;


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, InquiryFormComponent, PackageDetailsComponent, PackagesCrmComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  private readonly packageService = inject(PackagesService);
  public packages: Packages[] = [];
  
  ngOnInit(): void {
    this.getPackages();
  }
  
  getPackages() {
    this.packageService.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  @ViewChild('packageModal') packageModal!: PackageDetailsComponent;
  isAddPackagesModalOpen: boolean = false;
  additionalPackages!: { image_url: string; name: string; description: string; };
  openPackageModal(offer: any) {
    this.packageModal.openModal(offer);
  }

  openAddPackages(packages: any) {
    this.isAddPackagesModalOpen = true;
  }

  closeAddPackages() {
    this.isAddPackagesModalOpen = false;
  }
}
