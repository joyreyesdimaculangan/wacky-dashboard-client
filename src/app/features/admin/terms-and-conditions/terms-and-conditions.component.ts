import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TermsService } from '../../../services/terms.service';
import { Observable } from 'rxjs';
import { Terms, TermsSection } from '../../../models/terms';

function firstValueFrom<T>(observable: Observable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const subscription = observable.subscribe({
      next(value) {
        resolve(value);
        subscription.unsubscribe();
      },
      error(err) {
        reject(err);
        subscription.unsubscribe();
      }
    });
  });
}

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
  <div
      class="flex-1 bg-green-50 min-h-[100dvh] flex flex-col sticky top-0 z-50"
    >
    <div class="p-[clamp(1rem,3vw,2rem)]">
      <h1 class="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-green-700 mb-[clamp(1rem,3vw,1.5rem)]">
        Manage Terms & Conditions
      </h1>

      <form [formGroup]="termsForm" (ngSubmit)="onSubmit()" class="space-y-[clamp(1rem,3vw,1.5rem)]">
        <!-- Sections Array -->
        <div formArrayName="sections" class="space-y-[clamp(1rem,2vw,1.25rem)]">
          <div *ngFor="let section of sections.controls; let i = index" 
               [formGroupName]="i"
               class="bg-white rounded-lg shadow-sm p-[clamp(1rem,2vw,1.5rem)]">
            
            <!-- Section Title -->
            <input formControlName="title"
                   placeholder="Section Title"
                   class="w-full mb-2 p-2 border border-gray-300 rounded-lg 
                          text-[clamp(1rem,1.5vw,1.25rem)] font-semibold
                          bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
            
            <!-- Section Content -->
            <textarea formControlName="content"
                     placeholder="Section Content"
                     rows="4"
                     class="w-full p-2 border border-gray-300 rounded-lg 
                            text-[clamp(0.875rem,1.5vw,1rem)]
                            focus:ring-2 focus:ring-green-500 focus:border-green-500
                            resize-y min-h-[100px]">
            </textarea>

            <!-- Delete Section Button -->
            <button type="button"
                    (click)="removeSection(i)"
                    class="mt-2 text-red-500 hover:text-red-700">
              Remove Section
            </button>
          </div>
        </div>

        <!-- Add Section Button -->
        <button type="button"
                (click)="addSection()"
                class="w-full py-2 border-2 border-dashed border-gray-300 
                       rounded-lg text-gray-600 hover:border-green-500 
                       hover:text-green-500 transition-colors">
          Add New Section
        </button>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button type="submit"
                  [disabled]="termsForm.invalid || loading"
                  class="px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)]
                         text-[clamp(0.875rem,1.5vw,1rem)] bg-green-500 text-white 
                         rounded-lg hover:bg-green-600 transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed">
            {{ loading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsAndConditionsComponent implements OnInit {
  termsForm!: FormGroup;
  loading = false;

  private fb = inject(FormBuilder);
  private termsService = inject(TermsService);

  get sections() {
    return this.termsForm.get('sections') as FormArray;
  }

  ngOnInit() {
    this.initForm();
    this.loadTerms();
  }

  private initForm() {
    this.termsForm = this.fb.group({
      sections: this.fb.array([])
    });
  }

  addSection() {
    const section = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.sections.push(section);
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  private async loadTerms() {
    try {
      const terms = await firstValueFrom(this.termsService.createTerms(this.termsForm.value));
      if (terms?.sections?.length) {
        terms.sections.forEach((section: TermsSection) => {
          this.sections.push(
            this.fb.group({
              title: [section.title, Validators.required],
              content: [section.content, Validators.required]
            })
          );
        });
      } else {
        this.addSection();
      }
    } catch (error) {
      console.error('Failed to load terms:', error);
      this.addSection();
    }
  }
  
  async onSubmit() {
    if (this.termsForm.invalid) return;
    
    this.loading = true;
    try {
      await this.termsService.updateTerms(this.termsForm.value);
      // Show success message
    } catch (error) {
      console.error('Failed to update terms:', error);
      // Show error message
    } finally {
      this.loading = false;
    }
  }
}
