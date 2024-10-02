import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../drawer/drawer.component';
import { FormsModule } from '@angular/forms';

interface Notification { // Define the Notification interface
  message: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DrawerComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] // Fixed 'styleUrl' to 'styleUrls'
})
export class DashboardComponent {
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
    { message: '4 reservations made by August 15, 2024' },
    { message: 'New reservation coming up' },
    { message: '3 reservations made by August 14, 2024' },
  ];
  
  adminEmail: string = '';
  adminPassword: string = '';
  admin: any;

  ngOnInit() {
    this.setFilter('all'); // Set the default filter to 'all' on component initialization
  }

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
}
