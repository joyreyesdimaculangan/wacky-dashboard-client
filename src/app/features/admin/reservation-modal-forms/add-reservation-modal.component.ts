import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReservationService } from '../../../services/reservation.service';
import { PackagesService } from '../../../services/packages.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { MatIcon } from '@angular/material/icon';
import { PackageAddOnsService } from '../../../services/packageAddOns.service';
import { AvailableAddOns, Packages } from '../../../models/packages';
import { PackageAddOns } from '../../../models/packageAddOns';

@Component({
  selector: 'app-add-reservation-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      *ngIf="showModal"
    >
      <div
        class="relative bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition duration-300 ease-in-out scale-95"
      >
        <!-- Close Button -->
        <button
          (click)="closeAddReservation()"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl p-2 rounded-full focus:outline-none transition-colors duration-200 ease-in-out"
          aria-label="Close"
        >
          &times;
        </button>

        <!-- Modal Header -->
        <h2
          class="text-3xl font-extrabold mb-8 text-green-700 text-center text-green py-2 rounded-lg"
        >
          Create Reservation
        </h2>

        <!-- Reservation Form -->
        <form [formGroup]="adminReservationForm">
          <div class="space-y-6">
            <!-- Package Type -->
            <div class="relative">
              <label
                for="packageType"
                class="block text-sm font-medium text-gray-700"
                >Package Type</label
              >
              <select
                id="packageType"
                type="text"
                formControlName="packageType"
                name="packageType"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-green focus:ring-green-500 focus:border-green-500 transition-all"
                required
              >
                <option
                  *ngFor="let package of packages"
                  [value]="package.packageID"
                >
                  {{ package.name }}
                </option>
              </select>
            </div>

            <!-- Customer Name -->
            <div class="relative">
              <label
                for="name"
                class="block text-sm font-medium text-gray-700"
                >Customer Name</label
              >
              <input
                id="name"
                type="text"
                formControlName="name"
                name="name"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              />
            </div>

            <!-- Contact Number -->
            <div class="relative">
              <label
                for="contactNumber"
                class="block text-sm font-medium text-gray-700"
                >Contact Number</label
              >
              <input
                id="contactNumber"
                type="tel"
                formControlName="contactNumber"
                name="contactNumber"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
                required
              />
            </div>

            <!-- Number of Pax -->
            <div class="relative">
              <label
                for="numberOfPax"
                class="block text-sm font-medium text-gray-700"
                >Number of Pax</label
              >
              <input
                id="numberOfPax"
                type="number"
                formControlName="numberOfPax"
                name="numberOfPax"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
                required
                min="1"
              />
            </div>

            <!-- Reservation Date -->
            <div class="relative">
              <label
                for="eventDate"
                class="block text-sm font-medium text-gray-700"
                >Reservation Date</label
              >
              <mat-form-field appearance="outline" class="w-full mt-2">
                <input
                  id="eventDate"
                  [matDatepicker]="datepicker"
                  formControlName="eventDate"
                  name="eventDate"
                  matInput
                  placeholder="Select a date"
                  class="block w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
                <mat-datepicker-toggle
                  matSuffix
                  [for]="datepicker"
                ></mat-datepicker-toggle>
                <mat-datepicker #datepicker></mat-datepicker>
              </mat-form-field>
            </div>

            <!-- Time Picker -->
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700"
                >Select Time</label
              >
              <ul class="grid grid-cols-2 gap-4 mt-2">
                <li
                  *ngFor="
                    let time of [
                      '10:00 AM',
                      '10:30 AM',
                      '11:00 AM',
                      '3:00 PM',
                      '3:30 PM',
                      '4:00 PM'
                    ];
                    let i = index
                  "
                >
                  <input
                    type="radio"
                    [id]="'time' + i"
                    [value]="time"
                    class="hidden peer"
                    formControlName="eventTime"
                    required
                  />
                  <label
                    [for]="'time' + i"
                    class="inline-flex items-center justify-center w-full p-3 text-sm font-semibold bg-white border border-green-600 rounded-lg cursor-pointer text-green-600 peer-checked:bg-green-600 peer-checked:text-white hover:bg-green-500 transition duration-300 ease-in-out"
                  >
                    {{ time }}
                  </label>
                </li>
              </ul>
            </div>

            <!-- Additional Fields -->
            <div class="relative">
              <label
                for="eventTheme"
                class="block text-sm font-medium text-gray-700"
                >Event Theme</label
              >
              <input
                id="eventTheme"
                type="text"
                formControlName="eventTheme"
                name="eventTheme"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>

            <div class="relative">
              <label
                for="cakeTheme"
                class="block text-sm font-medium text-gray-700"
                >Cake Theme</label
              >
              <input
                id="cakeTheme"
                type="text"
                formControlName="cakeTheme"
                name="cakeTheme"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>

            <div class="relative">
              <label
                for="otherRequest"
                class="block text-sm font-medium text-gray-700"
                >Other Requests</label
              >
              <input
                id="otherRequest"
                type="text"
                formControlName="otherRequest"
                name="otherRequest"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-gray-900 focus:ring-green-500 focus:border-green-500 transition-all"
              />
            </div>

            <!-- AddOns -->
            <div class="relative">
              <label
                for="addOns"
                class="block text-sm font-medium text-gray-700"
                >AddOns Included</label
              >
              <select
                id="addOns"
                type="text"
                formControlName="addOns"
                name="addOns"
                class="mt-2 block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 text-green focus:ring-green-500 focus:border-green-500 transition-all"
              >
                <option
                  *ngFor="let availableAddOns of packages" 
                  [value]="availableAddOns.addOns"
                >
                  {{ availableAddOns.addOns }} 
                </option>
              </select>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="mt-8 flex justify-end gap-3">
            <button
              type="button"
              (click)="closeAddReservation()"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              (click)="submitForm()"
              class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./add-reservation-modal.component.scss'],
})
export class AddReservationModalComponent implements OnInit{
  private readonly packageService = inject(PackagesService);
  private readonly reservationService = inject(ReservationService);
  private readonly getPackageAddOnsService = inject(PackageAddOnsService);
  private readonly authService = inject(AuthService);
  private fb = inject(FormBuilder);
  
  adminReservationForm!: FormGroup;
  availableAddOns: PackageAddOns[] = [];
  packages: Packages[] = [];
  addOns: PackageAddOns[] = [];

  constructor() {
    this.adminReservationForm = this.fb.group({
      packageType: ['', Validators.required],
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      numberOfPax: [50, Validators.required],
      eventDate: [null, Validators.required],
      eventTime: ['', Validators.required],
      eventTheme: ['', Validators.required],
      cakeTheme: ['', Validators.required],
      addOns: [[], Validators.required],
      otherRequest: [''],
    });
  }

  ngOnInit() {
    this.fetchPackages();
    this.fetchAddOnsId(this.adminReservationForm.value.packageType);
  }

  fetchPackages() {
    this.packageService.getPackages().subscribe((data: any) => {
      this.packages = data;
    });
  }

  fetchAddOnsId(packageId: string) {
    this.getPackageAddOnsService.getAddOnById(packageId).subscribe((data: AvailableAddOns[]) => {
      this.availableAddOns = data;
    });
  }

  @Output() closeModal = new EventEmitter<void>();
  showModal = true; // Initial value to show the modal
  reservation = {
    packageType: '',
    name: '',
    contactNumber: '',
    numberOfPax: 1,
    eventDate: null,
    eventTime: '',
    eventTheme: '',
    cakeTheme: '',
    otherRequest: '',
    addOns: '',
  };

  closeAddReservation() {
    this.showModal = false; // Hides the modal
    this.closeModal.emit(); // Emits event to the parent component
  }

  submitForm() {
    const accountProfileId = this.authService.user()?.accountProfileId;
    const reservationData = {
      ...this.adminReservationForm.value,
      accountProfileId,
    };
    console.log('Reservation Data:', reservationData);
    this.reservationService.createReservation(reservationData).subscribe(
      (response) => {
        console.log('Reservation created:', response);
        this.closeAddReservation();
      },
      (error) => {
        console.error('Error creating reservation:', error);
      }
    );
  }
}
