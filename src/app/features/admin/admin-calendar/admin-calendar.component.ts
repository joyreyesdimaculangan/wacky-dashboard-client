import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Router } from '@angular/router';
import { DrawerComponent } from "../drawer/drawer.component";
import { ReservationService } from '../../../services/reservation.service';
import { EditedReservationForm } from '../../../models/reservation-form';

@Component({
  selector: 'app-admin-calendar',
  standalone: true,
  imports: [CommonModule, DrawerComponent],
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {
  calendar!: Calendar;
  schedulerLicenseKey: string = 'GPL-My-Project-Is-Open-Source';
  reservations: EditedReservationForm[] = [];

  private readonly reservationService = inject(ReservationService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getReservations().subscribe({
      next: (data: EditedReservationForm[]) => {
        console.log('Fetched reservations:', data); // Debugging
        this.reservations = data;
        this.initializeCalendar();
      },
      error: (error) => {
        console.error('Error fetching reservations:', error); // Error handling
      }
    });
  }

  initializeCalendar() {
    const calendarEl: HTMLElement | null = document.getElementById('calendar');

    if (calendarEl) {
      const events = this.reservations.map(reservation => ({
        id: reservation.reservationID,
        title: reservation.name,
        start: reservation.eventDate,
        end: reservation.eventDate, // Assuming eventDate is the same for start and end
        resourceId: reservation.packageID || '' // Ensure resourceId is always a string
      }));

      const resources = this.reservations.map(reservation => ({
        id: reservation.packageID || '', // Ensure id is always a string
        title: reservation.packageID || '' // Ensure title is always a string
      }));

      console.log('Initializing calendar with events:', events); // Debugging
      console.log('Initializing calendar with resources:', resources); // Debugging

      this.calendar = new Calendar(calendarEl, {
        schedulerLicenseKey: this.schedulerLicenseKey,
        plugins: [resourceTimelinePlugin, dayGridPlugin],
        initialView: 'resourceTimeline',
        resourceAreaHeaderContent: 'Venue',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
        },
        resources: resources,
        events: events,
        eventClick: this.handleEventClick.bind(this),
        timeZone: 'UTC' // Ensure consistent timezone handling
      });

      this.calendar.render();
      console.log('Calendar initialized and rendered'); // Debugging
    } else {
      console.error('Calendar element not found'); // Error handling
    }
  }

  handleEventClick(info: any) {
    this.router.navigate(['/admin/view-reservations', info.event.id]);
  }
}