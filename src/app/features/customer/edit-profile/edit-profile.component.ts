import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/auth/services/user.service';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';
import { AccountProfileService } from '../../../services/account-profile.service';
import { AccountProfile } from '../../../models/accountProfile';
import { environment } from '../../../../environments/environment.development';
import { User } from '../../../core/auth/models/user.model';
import { EnterSubmitDirective } from '../../../enter-submit.directive';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    EnterSubmitDirective
  ],
  template: `
    <div
      class="min-h-screen relative flex items-center justify-center bg-cover bg-center"
      style="background-image: url('assets/images/Food House.jpg')"
    >
      <!-- Overlay with Green Opacity -->
      <div class="absolute inset-0 bg-green-200 opacity-50"></div>

      <!-- Edit Profile Card -->
      <div class="relative bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
        <!-- Logo -->
        <div class="absolute top-[-3.5rem] left-1/2 transform -translate-x-1/2">
          <img
            src="assets/images/Wacky's Logo.png"
            alt="Logo"
            class="h-28 w-28"
          />
        </div>

        <h2
          class="text-4xl font-extrabold text-green-700 text-center mt-16 mb-8"
        >
          Edit Profile
        </h2>

        <form [formGroup]="editProfileForm" (enterSubmit)="onSubmit()"
        appEnterSubmit>
          <!-- Name Input -->
          <div class="mb-6">
            <label for="name" class="block text-green-900 font-semibold mb-2"
              >Name</label
            >
            <input
              id="name"
              formControlName="name"
              class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <!-- Email Input -->
          <div class="mb-6">
            <label for="contactNo" class="block text-green-900 font-semibold mb-2"
              >Contact No.</label
            >
            <input
              id="contactNo"
              formControlName="contactNo"
              type="tel"
              class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your Contact Number"
            />
          </div>

          <!-- Address Input -->
          <div class="mb-6">
            <label for="address" class="block text-green-900 font-semibold mb-2"
              >Address</label
            >
            <input
              id="address"
              formControlName="address"
              class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your address"
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end gap-4 mt-4">
            <!-- Cancel Button -->
            <button
              (click)="onCancel()"
              type="button"
              class="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 font-semibold rounded-md text-sm px-6 py-2 transition duration-300 shadow-sm hover:shadow-md"
            >
              Cancel
            </button>

            <!-- Save Button -->
            <button
              (click)="onSubmit()"
              (enterSubmit)="onSubmit()"
              type="button"
              class="text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400 font-semibold rounded-md text-sm px-6 py-2 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: './edit-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent {
  profileImage: string | undefined;
  showPassword: boolean = false;
  toastNotifications = inject(ToastNotificationsComponent);

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly accountProfileService = inject(AccountProfileService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  public readonly editProfileForm = this.fb.nonNullable.group<AccountProfile>({
    accountProfileID: this.fb.nonNullable.control('', Validators.required),
    name: this.fb.nonNullable.control('', [Validators.required]),
    contactNo: this.fb.nonNullable.control('', Validators.required),
    address: this.fb.nonNullable.control('', Validators.required),
  });

  ngOnInit(): void {
    this.loadUserProfile();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  loadUserProfile(): void {
    const accountProfileID = this.route.snapshot.params['accountProfileID'];
    console.log('Account ID:', accountProfileID);
    this.accountProfileService
      .getAccountProfileByID(accountProfileID)
      .subscribe((accountProfile) => {
        this.editProfileForm.patchValue(accountProfile);
      });
  }

  onSubmit(): void {
    const accountProfileID = this.route.snapshot.params['accountProfileID'];
    const updatedUser = this.editProfileForm.value;
    this.accountProfileService
      .updateAccountProfile(accountProfileID, updatedUser)
      .subscribe({
        next: () => {
          this.toastNotifications.showSuccess(
            'Profile updated successfully.',
            'Success'
          );
        },
        error: (error: any) => {
          this.toastNotifications.showError(
            'Failed to update profile. Please try again.',
            'Error'
          );
          console.error('Profile update error:', error);
        },
      });
  }

  onCancel(): void {
    this.location.back();
  }
}
