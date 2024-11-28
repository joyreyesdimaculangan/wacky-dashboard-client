import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { DrawerComponent } from '../drawer/drawer.component';
import { ReservationService } from '../../../services/reservation.service';
import { EditedReservationForm } from '../../../models/reservation-form';
import moment from 'moment';

@Component({
  selector: 'app-admin-calendar',
  standalone: true,
  imports: [CommonModule, DrawerComponent],
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.scss'],
})
export class AdminCalendarComponent implements OnInit {
  calendar!: Calendar;
  schedulerLicenseKey: string = 'GPL-My-Project-Is-Open-Source';
  reservations: EditedReservationForm[] = [];

  private readonly reservationService = inject(ReservationService);
  private readonly router = inject(Router);

  location = inject(Location);
  loading = true;
  errorMessage: string | null = null;

  ngOnInit() {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getReservations().subscribe({
      next: (data: EditedReservationForm[]) => {
        this.reservations = data.map((reservation) => ({
          ...reservation,
          start: this.convertToISO(reservation.eventDate),
          end: this.convertToISO(reservation.eventDate),
        }));
        this.initializeCalendar();
      },
      error: (error) => {
        console.error('Error fetching reservations:', error); // Error handling
      },
    });
  }

  convertToISO(dateString: string): string {
    return moment(dateString, 'MM/DD/YYYY').toISOString();
  }

  initializeCalendar() {
    this.loading = false;
    const calendarEl: HTMLElement | null = document.getElementById('calendar');

    if (calendarEl) {
      const venues = [
        { id: 'venueA', title: 'Venue A (100-200 Pax)' },
        { id: 'venueB', title: 'Venue B (50-99 Pax)' },
        { id: 'venueC', title: 'Venue C (<=50 Pax)' },
      ];

      const events = this.reservations.map((reservation) => {
        let resourceId = '';
        if (reservation.numberOfPax >= 100 && reservation.numberOfPax <= 200) {
          resourceId = 'venueA';
        } else if (
          reservation.numberOfPax >= 50 &&
          reservation.numberOfPax < 100
        ) {
          resourceId = 'venueB';
        } else if (reservation.numberOfPax <= 50) {
          resourceId = 'venueC';
        }

        return {
          id: reservation.reservationID,
          title: reservation.package?.name,
          start: reservation.eventDate,
          end: reservation.eventDate, // Assuming eventDate is the same for start and end
          resourceId: resourceId, // Assign the appropriate venue based on number of pax
        };
      });

      this.calendar = new Calendar(calendarEl, {
        schedulerLicenseKey: this.schedulerLicenseKey,
        plugins: [
          resourceTimelinePlugin,
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ],
        initialView: 'dayGridMonth',
        resourceAreaHeaderContent: 'Venue',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        views: {
          dayGridMonth: {
            titleFormat: { year: 'numeric', month: 'long' },
          },
          timeGridWeek: {
            titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
          },
          timeGridDay: {
            titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
          },
        },
        resources: venues,
        events: events,
        eventClick: this.handleEventClick.bind(this),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Ensure consistent timezone handling
        height: '100%', // Ensure the calendar fits the container
        contentHeight: 'auto', // Adjust the content height to fit the container
        slotMinTime: '08:00:00', // Adjust the start time of the grid
        slotMaxTime: '20:00:00', // Adjust the end time of the grid
        slotDuration: '00:30:00', // Adjust the duration of each slot
        eventContent: function (arg) {
          return {
            html: `<div class="fc-event-title">${arg.event.title}</div>`,
          };
        },
        aspectRatio: 1.5, // Adjust aspect ratio for better layout
        eventColor: '#378006', // Set a default event color
        eventTextColor: '#ffffff', // Set a default event text color
        eventDisplay: 'block', // Display events as blocks
        eventBorderColor: '#ffffff', // Set a default event border color
        eventBackgroundColor: '#378006', // Set a default event background color
        eventTimeFormat: {
          // Customize event time format
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        },
        slotLabelFormat: {
          // Customize slot label format
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        },
        dayHeaderFormat: {
          // Customize day header format
          weekday: 'short',
          month: 'numeric',
          day: 'numeric',
          omitCommas: true,
        },
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

  onClose() {
    this.location.back();
  }
}
