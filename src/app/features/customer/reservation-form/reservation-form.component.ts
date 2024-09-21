import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  standalone: true,
  selector: 'app-reservation-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    RouterModule
  ],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-green-100 p-4">
      <div class="w-full max-w-xl p-8 bg-white shadow-lg rounded-lg">
        <h1 class="text-3xl font-bold text-center mb-8 text-green-600">Reservation Form</h1>

        <form [formGroup]="reservationForm" (ngSubmit)="onSubmit()" novalidate>

          <!-- Name Field -->
          <div class="mb-4">
            <label class="block text-sm font-bold text-green-700 mb-2" for="name">Full Name</label>
            <input
              id="name" type="text"
              formControlName="name"
              placeholder="Enter your full name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              required
            >
            <div *ngIf="reservationForm.get('name')?.invalid && (reservationForm.get('name')?.dirty || reservationForm.get('name')?.touched)" class="text-red-500 text-xs italic">
              Name is required.
            </div>
          </div>

          <!-- Email Field -->
          <div class="mb-4">
            <label class="block text-sm font-bold text-green-700 mb-2" for="email">Email</label>
            <input
              id="email" type="email"
              formControlName="email"
              placeholder="Enter your email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              required
            >
            <div *ngIf="reservationForm.get('email')?.invalid && (reservationForm.get('email')?.dirty || reservationForm.get('email')?.touched)" class="text-red-500 text-xs italic">
              Valid email is required.
            </div>
          </div>

          <!-- Buffet Selection -->
          <div class="mb-4">
            <label class="block text-sm font-bold text-green-700 mb-2" for="buffet">Buffet Selection</label>
            <select
              id="buffet"
              formControlName="buffet"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              required
            >
              <option value="" disabled>Select Buffet</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
            <div *ngIf="reservationForm.get('buffet')?.invalid && (reservationForm.get('buffet')?.dirty || reservationForm.get('buffet')?.touched)" class="text-red-500 text-xs italic">
              Buffet selection is required.
            </div>
          </div>

         <!-- Date Picker -->
        <div class="mb-4">
          <label class="block text-sm font-bold text-green-700 mb-2" for="date">Reservation Date</label>
          <mat-form-field appearance="fill" class="w-full">
            <mat-label>Select a date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="date">
            <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
            <mat-error *ngIf="reservationForm.get('date')?.invalid && (reservationForm.get('date')?.dirty || reservationForm.get('date')?.touched)">
              Date is required.
            </mat-error>
          </mat-form-field>
        </div>


          
          <!-- Time Input -->
          <div class="mb-4">
            <label class="block text-sm font-bold text-green-700 mb-2" for="time">Reservation Time</label>
            <input
              id="time" type="time"
              formControlName="time"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              required
            >
            <div *ngIf="reservationForm.get('time')?.invalid && (reservationForm.get('time')?.dirty || reservationForm.get('time')?.touched)" class="text-red-500 text-xs italic">
              Time is required.
            </div>
          </div>

          <!-- Theme Input -->
          <div class="mb-4">
            <label class="block text-sm font-bold text-green-700 mb-2" for="theme">Theme / Motif</label>
            <input
              id="theme" type="text"
              formControlName="theme"
              placeholder="Enter the theme or motif"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              required
            >
            <div *ngIf="reservationForm.get('theme')?.invalid && (reservationForm.get('theme')?.dirty || reservationForm.get('theme')?.touched)" class="text-red-500 text-xs italic">
              Theme is required.
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex items-center justify-center mt-6">
            <button type="submit" [disabled]="reservationForm.invalid" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./reservation-form.component.scss'],
  providers: [provideNativeDateAdapter()],
})
export class ReservationFormComponent {
  reservationForm: FormGroup;
  router = inject(Router);
  selectedDate: Date | null = null;
  dateClass!: MatCalendarCellClassFunction<any>;

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      buffet: ['', Validators.required],
      theme: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log('Form Submitted', this.reservationForm.value);
    }
  }

  onDateChange(date: Date | null) {
    this.selectedDate = date;
    this.reservationForm.patchValue({
      date: date
    });
  }
}
