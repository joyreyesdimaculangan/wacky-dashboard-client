import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './inquiry-form.component.html',
  styleUrls: ['./inquiry-form.component.scss'],
})
export class InquiryFormComponent {
  inquiryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inquiryForm = this.fb.group({
      name: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      eventDate: ['', Validators.required],
      eventType: ['', Validators.required],
      guestCount: [1, [Validators.required, Validators.min(1)]],
      duration: ['', Validators.required],
      budget: [0, [Validators.required, Validators.min(0)]],
      method: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.inquiryForm.valid) {
      // Handle the form submission
      console.log(this.inquiryForm.value);
    } else {
      // Display validation errors
      this.inquiryForm.markAllAsTouched();
    }
  }
}
