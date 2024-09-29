import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Calendar } from '@fullcalendar/core';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import dayGridPlugin from '@fullcalendar/daygrid'; // Import dayGrid plugin
import { DrawerComponent } from "../drawer/drawer.component";

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

  ngOnInit() {
    const calendarEl: HTMLElement | null = document.getElementById('calendar');

    if (calendarEl) {
      this.calendar = new Calendar(calendarEl, {
        schedulerLicenseKey: this.schedulerLicenseKey,
        plugins: [resourceTimelinePlugin, dayGridPlugin], // Include dayGrid plugin
        initialView: 'resourceTimeline',  // Set your default view
        resourceAreaHeaderContent: 'Venue',
        headerToolbar: {
          left: 'prev,next today', // Previous, Next, Today buttons
          center: 'title',         // Title in the center
          right: 'dayGridMonth,resourceTimelineWeek,resourceTimelineDay' // Add month and resource timeline views
        },
        resources: [
          { id: 'a', title: 'Room A' },
          { id: 'b', title: 'Room B' },
          { id: 'c', title: 'Room C' }
        ],
        events: [
          {
            id: '1',
            resourceId: 'a',
            start: '2024-09-29T11:00:00',
            end: '2024-09-29T14:00:00',
            title: 'Event 1',
            color: 'red',
          },
          {
            id: '2',
            resourceId: 'b',
            start: '2024-09-29T16:00:00',
            end: '2024-09-29T19:00:00',
            title: 'Event 2',
            color: 'blue',
          }
        ],
        slotMinTime: '07:00:00',
        slotMaxTime: '22:00:00',
        eventClick: this.handleEventClick.bind(this),
      });

      this.calendar.render();
    } else {
      console.error('Calendar element not found!');
    }
  }

  handleEventClick(info: any) {
    // Logic for handling event clicks
  }
}
