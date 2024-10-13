import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PackagesService } from '../../../../services/packages.service';

@Component({
  selector: 'app-packages-crm',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  template: `
  <!-- Modal Background -->
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" *ngIf="showModal">
      <!-- Modal Content -->
      <div class="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Close Button ('X') -->
        <button (click)="closeAddPackages()" class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full focus:outline-none">
          &times;
        </button>
        <!-- Modal Header -->
        <h2 class="text-2xl font-bold mb-6 text-green-700">Add Content</h2>
          <!-- Modal body -->
          <form [formGroup]="addPackagesForm" class="p-4 md:p-5" (submit)="submitForm($event)">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label 
                  for="name" 
                  class="block mb-2 text-sm font-medium text-gray-900">
                  Name
                </label>
                <input 
                  type="text" 
                  formControlName="name" 
                  name="name" 
                  id="name" 
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                  placeholder="Type product name" 
                  required="">
              </div>
              <div class="col-span-2">
                <label 
                  for="image_url" 
                  class="block mb-2 text-sm font-medium text-gray-900">
                  Image URL
                </label>
                <input 
                  type="url" 
                  formControlName="image_url" 
                  name="image_url" 
                  id="image_url" 
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                  placeholder="Paste image URL here" 
                  required="">
                <div class="flex items-center justify-center w-full">
                    <label 
                      for="dropzone-file" 
                      class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                </div> 
              </div>
              <div class="col-span-2">
                <label 
                  for="description" 
                  class="block mb-2 text-sm font-medium text-gray-900">
                  Product Description
                </label>
                <textarea 
                  formControlName="description" 
                  id="description" 
                  rows="4" 
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" 
                  placeholder="Write product description here">
                </textarea>                    
              </div>
            </div>
            <div class="flex justify-end mt-4">
                <button 
                    type="button" 
                    (click)="submitForm($event)" 
                    class="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Save Content
                </button>
            </div>
          </form>
        </div>
    </div>`,
  styleUrls: ['./packages-crm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesCrmComponent { 
  public isLoadingButton = signal(false);
  addPackagesSubscription = new Subscription();
  packagesService = inject(PackagesService);
  addPackagesForm!: FormGroup;
  @Input() showModal: boolean = true; 
  @Output() closeModal = new EventEmitter<void>(); 

  constructor(private fb: FormBuilder) {
    this.addPackagesForm = this.fb.group({
      name: ['', Validators.required],
      image_url: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  additionalPackages: { image_url: string; name: string; description: string } = {
    image_url: '',
    name: '',
    description: '',
  };

  inclusionInput: string = ''; // Temporary input for inclusions
  addOnInput: string = ''; // Temporary input for add-ons

  closeAddPackages() {
    this.closeModal.emit(); // Emit close event
  }
  
  submitForm(event: Event) {
    this.isLoadingButton.set(true); 
    this.addPackagesSubscription.add(
      this.packagesService.createPackage(this.additionalPackages).subscribe(() => {
        this.isLoadingButton.set(false);
        event.preventDefault();
        console.log('Form submitted:', this.additionalPackages);
        this.closeModal.emit();  
      })
    );
  }
}
