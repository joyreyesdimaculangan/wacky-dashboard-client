import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TermsService } from '../../../services/terms.service';
import { Observable } from 'rxjs';
import { TermsOfService, TermsSection } from '../../../models/terms';
import { Router } from '@angular/router';
import { DrawerComponent } from '../drawer/drawer.component';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DrawerComponent],
  template: `
    <div class="flex h-screen bg-gray-100">
      <app-drawer></app-drawer>
      <section class="dashboard-page flex-1 overflow-auto">
        <div class="dashboard-content">
          <header class="header">
            <h1>Terms & Conditions</h1>
          </header>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div class="flex items-center">
              <i class="fas fa-exclamation-triangle text-yellow-400 mr-3"></i>
              <div>
                <p class="text-sm text-yellow-700 font-medium">
                  Important Note:
                </p>
                <p class="text-sm text-yellow-600">
                  Please avoid empty sections and blank lines as they will be
                  displayed in the terms and conditions. Each section should
                  have both a title and content.
                </p>
              </div>
            </div>
          </div>

          <form [formGroup]="termsForm" class="bg-white rounded-lg shadow-sm">
            <div formArrayName="sections" class="space-y-6 p-6">
              <div
                *ngFor="let section of sections.controls; let i = index"
                [formGroupName]="i"
                class="bg-gray-50 p-6 rounded-lg border border-gray-200"
              >
                <!-- Enhanced Title Input -->
                <input
                  formControlName="title"
                  placeholder="Section Title"
                  class="w-full bg-white mb-4 p-4 rounded-lg border border-gray-300 
                   text-[clamp(1rem,1.5vw,1.25rem)] font-medium text-gray-800
                   placeholder:text-gray-400 placeholder:font-normal
                   focus:ring-2 focus:ring-green-500 focus:border-green-500
                   transition duration-200"
                />
                <!-- Enhanced Content Textarea -->
                <textarea
                  formControlName="content"
                  placeholder="Section Content"
                  rows="4"
                  class="w-full p-4 rounded-lg border border-gray-300
                   text-[clamp(0.875rem,1.25vw,1rem)] text-gray-700 leading-relaxed
                   placeholder:text-gray-400 placeholder:font-normal
                   focus:ring-2 focus:ring-green-500 focus:border-green-500
                   transition duration-200"
                ></textarea>
                <!-- Remove Button -->
                <button
                  type="button"
                  (click)="removeSection(i)"
                  class="mt-3 px-4 py-2 text-red-500 hover:text-red-700 
                         text-[clamp(0.875rem,1.25vw,1rem)] font-medium
                         transition duration-200"
                >
                  Remove Section
                </button>
              </div>
            </div>

            <div class="p-6 border-t border-gray-200">
              <button
                type="button"
                (click)="addSection()"
                class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg
                             text-gray-600 hover:border-green-500 hover:text-green-500"
              >
                Add Terms & Conditions
              </button>
            </div>

            <div class="flex justify-end gap-4 p-6 border-t border-gray-200">
              <button
                type="submit"
                (click)="onSubmit()"
                [disabled]="termsForm.invalid || loading"
                class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700
                             disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./terms-and-conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsAndConditionsComponent implements OnInit {
  termsForm!: FormGroup;
  loading = false;
  currentTerms: TermsOfService | null = null;

  private termsService = inject(TermsService);
  private fb = inject(FormBuilder);
  private toastNotifications = inject(ToastNotificationsComponent);

  get sections() {
    return this.termsForm.get('sections') as FormArray;
  }

  ngOnInit() {
    this.initForm();
    this.loadTerms();
  }

  private initForm() {
    this.termsForm = this.fb.group({
      sections: this.fb.array([]),
    });
  }

  private loadTerms() {
    this.termsService.getLatestTerms().subscribe({
      next: (terms) => {
        console.log('Terms received:', terms);
        if (terms && terms.sections) {
          this.currentTerms = terms;
          // Clear existing sections before patching
          while (this.sections.length !== 0) {
            this.sections.removeAt(0);
          }
          // Add each section from the loaded terms
          terms.sections.forEach((section) => {
            console.log('Adding section:', section);
            this.sections.push(
              this.fb.group({
                title: [section.title],
                content: [section.content],
              })
            );
          });
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading terms:', error);
        this.loading = false;
        this.toastNotifications.showError('Failed to load terms', 'Error');
      },
    });
  }

  private patchForm(terms: TermsOfService) {
    terms.sections.forEach((section) => {
      this.sections.push(
        this.fb.group({
          title: [section.title],
          content: [section.content],
        })
      );
    });
  }

  addSection() {
    this.sections.push(
      this.fb.group({
        title: [''],
        content: [''],
      })
    );
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  onSubmit() {
    if (this.termsForm.valid) {
      this.loading = true;
      const sections = this.termsForm.value.sections;

      const request$ = this.currentTerms
        ? this.termsService.updateTerms(this.currentTerms.id, sections)
        : this.termsService.createTerms('1.0', sections);

      request$.subscribe({
        next: (terms) => {
          this.currentTerms = terms;
          this.loading = false;
          this.toastNotifications.showSuccess(
            'Terms saved successfully',
            'Success'
          );
        },
        error: (error) => {
          console.error('Error saving terms:', error);
          this.loading = false;
          this.toastNotifications.showError('Failed to save terms', 'Error');
        },
      });
    }
  }
}
