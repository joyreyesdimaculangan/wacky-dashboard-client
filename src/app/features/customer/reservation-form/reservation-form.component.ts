import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent {
  reservationForm: FormGroup;

  calendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this)
  };

  constructor(private fb: FormBuilder) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      guests: [1, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required]
    });
  }

  handleDateClick(info: any) {
    this.reservationForm.patchValue({ date: info.dateStr });
    alert('Selected Date: ' + info.dateStr);
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log('Reservation Submitted:', this.reservationForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
