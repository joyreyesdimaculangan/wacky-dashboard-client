import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReservationFormComponent } from './reservation-form.component';

export const ReservationModule = {
  declarations: [
    ReservationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule
  ]
};
