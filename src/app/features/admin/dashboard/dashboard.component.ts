import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DrawerComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
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
}
