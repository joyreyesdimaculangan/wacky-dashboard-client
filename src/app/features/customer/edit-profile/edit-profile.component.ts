import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
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

        <form [formGroup]="editProfileForm" (ngSubmit)="onSubmit()">
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
            <label for="email" class="block text-green-900 font-semibold mb-2"
              >Email</label
            >
            <input
              id="email"
              formControlName="email"
              type="email"
              class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <!-- Phone Input -->
          <div class="mb-6">
            <label for="phone" class="block text-green-900 font-semibold mb-2"
              >Phone</label
            >
            <input
              id="phone"
              formControlName="phone"
              type="tel"
              class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
              placeholder="Enter your phone number"
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

          <div class="relative mb-6">
            <label
              for="password"
              class="block text-green-900 font-semibold mb-2"
              >Password</label
            >
            <div class="relative">
              <input
                [type]="showPassword ? 'text' : 'password'"
                id="password"
                formControlName="password"
                class="w-full p-4 pr-12 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                placeholder="Create a password"
              />
              <button
                type="button"
                (click)="togglePasswordVisibility()"
                class="absolute inset-y-0 right-0 flex items-center px-4 cursor-pointer text-gray-400 focus:outline-none"
                style="top: 50%; transform: translateY(-50%);"
              >
                <ng-container *ngIf="showPassword; else hidePassword">
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                    ></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </ng-container>
                <ng-template #hidePassword>
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path
                      d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                    ></path>
                    <path
                      d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                    ></path>
                    <line x1="2" x2="22" y1="2" y2="22"></line>
                  </svg>
                </ng-template>
              </button>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 mt-4">
              <!-- Cancel Button -->
              <button
                type="button"
                class="text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 font-semibold rounded-md text-sm px-6 py-2 transition duration-300 shadow-sm hover:shadow-md"
              >
                Cancel
              </button>

              <!-- Save Button -->
              <button
                type="button"
                class="text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400 font-semibold rounded-md text-sm px-6 py-2 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrl: './edit-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent {
  editProfileForm!: FormGroup;
  profileImage: string | undefined;
  showPassword: boolean = false;

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Initialize the form
    this.editProfileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });

    // Load user data here if available
    this.loadUserProfile();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  loadUserProfile(): void {
    // Simulated data fetch; replace with actual data fetching
    this.editProfileForm.patchValue({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    });

    // Placeholder image; replace with user's profile image URL if available
    this.profileImage = 'assets/profile-image.png';
  }

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const profileData = this.editProfileForm.value;
      console.log('Profile updated:', profileData);
      // Perform save operation here
    }
  }

  onCancel(): void {
    // Reset or navigate away as needed
    console.log('Edit cancelled');
  }
}
