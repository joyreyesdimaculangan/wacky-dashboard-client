import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  Signal,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MenuService } from '../../../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMenu, Menu } from '../../../../../models/menu';
import { FileUploadService } from '../../../../../services/file-upload.service';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastNotificationsComponent } from '../../../../../core/toastNotifications/toastNotifications.component';
import { EnterSubmitDirective } from '../../../../../enter-submit.directive';

@Component({
  selector: 'app-offers-crm',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    EnterSubmitDirective,
  ],
  template: `
    <div
      class="flex-1 bg-green-100 min-h-[100dvh] flex flex-col sticky top-0 z-50"
      *ngIf="authService.isAdmin()"
    >
      <!-- Overlay -->
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-[clamp(1rem,3vw,2rem)]"
      >
        <!-- Modal Container -->
        <div
          class="relative bg-white rounded-lg shadow-lg w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          <!-- Close Button -->
          <button
            (click)="closeAddContent()"
            class="absolute top-[clamp(0.75rem,2vw,1rem)] right-[clamp(0.75rem,2vw,1rem)] 
                       text-gray-500 hover:text-gray-800 
                       text-[clamp(1.5rem,4vw,2rem)] 
                       p-[clamp(0.5rem,1.5vw,0.75rem)] 
                       rounded-full focus:outline-none 
                       transition-colors duration-200"
          >
            &times;
          </button>

          <!-- Title -->
          <h2
            class="text-[clamp(1.25rem,3vw,2rem)] font-bold mb-[clamp(1rem,3vw,1.5rem)] text-green-700 p-[clamp(1.5rem,4vw,2rem)] pb-0"
          >
            Add Content
          </h2>

          <!-- Form -->
          <form
            [formGroup]="addContentForm"
            (enterSubmit)="onSubmit()"
            appEnterSubmit
            class="p-[clamp(1rem,4vw,2rem)] space-y-[clamp(1rem,3vw,1.5rem)]"
          >
            <!-- Form content here -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 gap-x-[clamp(1.5rem,4vw,2rem)] gap-y-[clamp(1rem,3vw,1.5rem)] mb-[clamp(1rem,4vw,1.5rem)] px-[clamp(0.5rem,2vw,1rem)]"
            >
              <!-- Increased gap to 6 for more space -->

              <!-- Name input -->
              <div class="col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Name</label
                >
                <input
                  type="text"
                  formControlName="name"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Type product name"
                  required=""
                />
                <mat-error
                  *ngIf="
                    addContentForm.controls['name'].hasError('required') &&
                    addContentForm.controls['name']?.touched
                  "
                >
                  Name is required
                </mat-error>
              </div>

              <div class="col-span-2">
                <label
                  for="image_url"
                  class="block mb-2 text-sm font-medium text-gray-900"
                >
                  Image Upload
                  <span class="text-sm text-gray-500">(Max size: 5MB)</span>
                </label>

                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    [ngClass]="selectedFile ? 'h-auto' : 'h-64'"
                  >
                    <!-- Upload Icon and Text -->
                    <div
                      class="flex flex-col items-center justify-center pt-5 pb-6"
                      *ngIf="!selectedFile"
                    >
                      <svg
                        class="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 5MB, 800x400px recommended)
                      </p>
                    </div>

                    <!-- Image Preview -->
                    <div *ngIf="selectedFile" class="relative w-full">
                      <img
                        [src]="previewUrl()"
                        alt="Preview"
                        class="w-full object-cover rounded-lg"
                        style="max-height: 300px"
                      />
                      <div
                        class="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded"
                      >
                        {{ formatFileSize(selectedFile.size) }}
                      </div>
                    </div>

                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      (change)="onFileSelected($event)"
                      accept="image/*"
                    />
                  </label>
                </div>

                <!-- Error Messages -->
                <mat-error *ngIf="!selectedFile" class="mt-2">
                  Image is required
                </mat-error>
                <mat-error
                  *ngIf="selectedFile && selectedFile.size > maxFileSize"
                  class="mt-2"
                >
                  File size exceeds maximum limit of 5MB
                </mat-error>
              </div>
              <!-- Description input -->
              <div class="col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Product Description</label
                >
                <textarea
                  formControlName="description"
                  id="description"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write product description here"
                >
                </textarea>
                <mat-error
                  *ngIf="
                    addContentForm.controls['description'].hasError(
                      'required'
                    ) && addContentForm.controls['description']?.touched
                  "
                >
                  Description is required
                </mat-error>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end mt-4">
              <button
                type="button"
                (click)="closeAddContent()"
                class="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
              >
                Cancel
              </button>
              <button
                type="button"
                (click)="onSubmit()"
                (enterSubmit)="onSubmit()"
                [disabled]="!addContentForm.valid || !selectedFile"
                class="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Save Content
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./offers-crm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OffersCrmComponent {
  private readonly menuService = inject(MenuService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly imageService = inject(FileUploadService);
  public authService = inject(AuthService);
  userRole: string | null = null;
  addContentForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl = signal<string | ArrayBuffer | null>(null);
  toastNotification = inject(ToastNotificationsComponent);

  maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

  validateFile(file: File): boolean {
    if (file.size > this.maxFileSize) {
      this.toastNotification.showError(
        `File size must be less than ${this.formatFileSize(this.maxFileSize)}`,
        'Error'
      );
      return false;
    }
    return true;
  }

  formatFileSize(bytes: number): string {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)}MB`;
  }

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
  }

  constructor(private fb: FormBuilder) {
    this.addContentForm = this.fb.group({
      name: ['', Validators.required],
      image_url: [''],
      description: ['', Validators.required],
    });
  }

  closeAddContent() {
    this.addContentForm.reset();
    this.router.navigate(['/admin/home']);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file.name, 'Size:', file.size / (1024 * 1024), 'MB');
      
      if (this.validateFile(file)) {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl.set(reader.result as string);
        };
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
          this.toastNotification.showError('Error reading file', 'Error');
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.authService.isAdmin()) {
      if (this.addContentForm.valid && this.selectedFile) {
        const formData = new FormData();
        formData.append('image', this.selectedFile, this.selectedFile.name);
        formData.append('name', this.addContentForm.controls['name'].value);
        formData.append(
          'description',
          this.addContentForm.controls['description'].value
        );

        this.menuService.createMenu(formData).subscribe({
          next: () => {
            this.toastNotification.showSuccess(
              'Content added successfully',
              'Success'
            );
            this.addContentForm.reset();
            this.router.navigate(['/admin/home']);
          },
          error: (err) => {
            console.error('Error saving content:', err);
            this.toastNotification.showError(
              'The uploaded photo exceeds the maximum allowed size. Please upload a smaller photo.',
              'Error'
            );
          },
        });
      } else {
        this.toastNotification.showError(
          'Please fill all required fields and upload an image',
          'Error'
        );
      }
    } else {
      this.toastNotification.showError(
        'You do not have permission to add content',
        'Error'
      );
    }
  }
}
