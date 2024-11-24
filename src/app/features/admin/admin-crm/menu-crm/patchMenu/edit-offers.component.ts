import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../../../services/menu.service';
import { EditMenuValues, Menu } from '../../../../../models/menu';
import { FileUploadService } from '../../../../../services/file-upload.service';
import { ToastNotificationsComponent } from '../../../../../core/toastNotifications/toastNotifications.component';

@Component({
  selector: 'app-edit-offers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` 
  <div
    class="flex-1 bg-green-100 min-h-screen flex flex-col sticky top-0 z-50"
  >
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <button
          (click)="closeEditContent()"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full focus:outline-none"
        >
          &times;
        </button>
        <h2 class="text-2xl font-bold mb-6 text-green-700">Edit Content</h2>
        <form
          [formGroup]="editMenuForm"
          class="p-4 md:p-5"
        >
          <div class="grid gap-4 mb-4 grid-cols-2">
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
              />
            </div>
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
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              type="button"
              (click)="closeEditContent()"
              class="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
            >
              Cancel
            </button>
            <button
              type="button"
              (click)="submitForm()"
              class="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save Content
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>`,
  styleUrl: './edit-offers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOffersComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly menuService = inject(MenuService);
  private readonly router = inject(Router);
  private readonly imageService = inject(FileUploadService);
  toastNotification = inject(ToastNotificationsComponent);
  selectedFile: File | null = null;
  previewUrl = signal<string | ArrayBuffer | null>(null);
  public readonly editMenuForm = this.fb.nonNullable.group<Menu>({
    menuID: this.fb.nonNullable.control('', [Validators.required]),
    name: this.fb.nonNullable.control('', Validators.required),
    image_url: this.fb.nonNullable.control('', Validators.required),
    description: this.fb.nonNullable.control('', Validators.required),
  });

  ngOnInit() {
    this.getMenuByMenuID();
  }

  get nameControl() {
    return this.editMenuForm.controls.name as FormControl;
  }

  getMenuByMenuID() {
    const menuID = this.route.snapshot.params['menuID'];
    console.log(this.route.snapshot);
    this.menuService.getMenuByMenuID(menuID).subscribe((menu) => {
      this.editMenuForm.patchValue(menu);
      this.previewUrl.set(menu.image_url);
    });
  }

  closeEditContent() {
    this.editMenuForm.reset();
    this.router.navigate(['/admin/home']);
  }

  submitForm() {
    const menuID = this.route.snapshot.params['menuID'];
    this.menuService
      .updateMenu(menuID, this.editMenuForm.value as EditMenuValues)
      .subscribe({
        next: () => {
          console.log('Menu updated successfully');
          this.editMenuForm.reset();
          this.toastNotification.showSuccess('Menu updated successfully', 'Success');
          this.router.navigate(['/admin/home']);
        },
        error: (err) => {
          this.toastNotification.showError('Error updating menu', 'Error');
          console.error('Error updating menu:', err);
        },
      });
  }
}
