import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TermsService } from '../../../services/terms.service';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule],
  template: `<div class="p-[clamp(1rem,3vw,2rem)]">
    <h1
      class="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-green-700 mb-[clamp(1rem,3vw,1.5rem)]"
    >
      Manage Terms & Conditions
    </h1>

    <form [formGroup]="termsForm" (ngSubmit)="onSubmit()">
      <quill-editor
        formControlName="content"
        [modules]="editorConfig"
        class="h-[clamp(20rem,60vh,30rem)]"
      >
      </quill-editor>

      <div
        class="flex justify-end gap-[clamp(0.5rem,2vw,1rem)] mt-[clamp(1rem,3vw,1.5rem)]"
      >
        <button
          type="submit"
          [disabled]="termsForm.invalid || loading"
          class="px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)]
                     text-[clamp(0.875rem,1.5vw,1rem)] bg-green-500 text-white 
                     rounded-lg hover:bg-green-600 transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>`,
  styleUrl: './terms-and-conditions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsAndConditionsComponent implements OnInit {
  termsForm: FormGroup;
  loading: boolean = false;

  private fb = inject(FormBuilder);
  private termsService = inject(TermsService);
  toastNotification = inject(ToastNotificationsComponent);

  editorConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link'],
      ['clean'],
    ],
  };

  constructor() {
    this.termsForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadTerms();
  }

  async loadTerms() {
    try {
      const terms = await this.termsService.getTerms().toPromise();
      this.termsForm.patchValue({ content: terms.content });
    } catch (error) {
      this.toastNotification.showError('Failed to load terms', 'Error');
    }
  }

  async onSubmit() {
    if (this.termsForm.invalid) return;

    this.loading = true;
    try {
      await this.termsService.updateTerms(this.termsForm.value).toPromise();
      this.toastNotification.showSuccess(
        'Terms updated successfully',
        'Success'
      );
    } catch (error) {
      this.toastNotification.showError('Failed to update terms', 'Error');
    } finally {
      this.loading = false;
    }
  }
}
