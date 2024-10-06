import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../drawer/drawer.component';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../../services/reservation.service';

interface Notification { 
  title: string;      
  message: string;
  date: string;       // Made date required
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DrawerComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] 
})
export class DashboardComponent implements OnInit {
  inquiries = 0;
  pending = 0;
  approved = 0;

  searchTerm: string = ''; // For the search input
  dropdownOpen: boolean = false; // For the dropdown visibility

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.loadStatistics();
    this.setFilter('all');
  }

  loadStatistics() {
    // Get the reservation statistics from the service
    const stats = this.reservationService.getStatistics();
    this.inquiries = stats.inquiries;
    this.pending = stats.pending;
    this.approved = stats.approved;
  }

  cards = [
    { title: 'Monthly Revenue Trends', content: 'Graph for sales', category: 'sales' },
    { title: 'Yearly Revenue Trends', content: 'Graph for sales', category: 'sales' },
    { title: 'Most Availed Packages', content: 'Graph for reservations', category: 'reservations' },
    { title: 'Category Revenue', content: 'Graph for sales', category: 'sales' },
    { title: 'Monthly Reservation Trends', content: 'Graph for reservations', category: 'reservations' },
    { title: 'Annual Reservation Patterns', content: 'Graph for reservations', category: 'reservations' },
    { title: 'Reservation by Time Slot', content: 'Graph for reservations', category: 'reservations' },
    { title: 'Comparison of Pax', content: 'Graph for customers', category: 'customers' },
  ];

  filteredCards = this.cards;
  activeFilter: string = 'all';
  
  notifications: Notification[] = [
    { title: 'Reservations Coming Up', message: '4 reservations made by August 15, 2024', date: 'August 1, 2024' }, 
    { title: 'New Reservation Alert', message: 'A new reservation has been created.', date: 'August 2, 2024' }, 
    { title: 'Reservation Reminder', message: '3 reservations made by August 14, 2024', date: 'August 3, 2024' }, 
  ];
  
  adminEmail: string = '';
  adminPassword: string = '';
  admin: any;  // Consider specifying a type for admin

  setFilter(filter: string): void {
    this.activeFilter = filter;
    if (filter === 'all') {
      this.filteredCards = this.cards;
    } else {
      this.filteredCards = this.cards.filter(card => card.category === filter);
    }
  }

  updateAccount(): void {
    // Add logic to handle account update (e.g., API call)
    console.log('Account updated:', { email: this.adminEmail, password: this.adminPassword });
  }

  // Toggle the dropdown menu
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

}
