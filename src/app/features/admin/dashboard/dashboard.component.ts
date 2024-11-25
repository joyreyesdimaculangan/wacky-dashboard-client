import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../drawer/drawer.component';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../../services/reservation.service';
import { NotificationsService } from '../../../services/notifications.service';
import { DashboardService } from '../../../services/dashboard.service';
import { Notifications } from '../../../models/notifications';
import { NgApexchartsModule } from 'ng-apexcharts';

import { ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ng-apexcharts';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetAccountIdService } from '../../customer/reservation-form/getAccountId.service';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  fill?: ApexFill;
  plotOptions?: ApexPlotOptions;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DrawerComponent, CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  
  newNotifications: Notifications[] = [];
  notifications: Notifications[] = [];
  activeFilter: string = 'all';
  inquiries: number = 0;
  pending: number = 0;
  approved: number = 0;

  accountProfileName: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  auth = inject(AuthService);
  router = inject(Router);

  userRole: string | null = null;

  public lineChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public areaChartOptions!: Partial<ChartOptions>;
  public heatmapChartOptions!: Partial<ChartOptions>;

  private route = inject(ActivatedRoute);
  currentFragment: string | null = null;

  private readonly toastNotifications = inject(ToastNotificationsComponent);
  private readonly getAccountNameService = inject(GetAccountIdService);
  private readonly notificationService = inject(NotificationsService);
  private readonly reservationService = inject(ReservationService);
  private readonly dashboardService = inject(DashboardService);
  public authService = inject(AuthService);
  accountInfo: { id: string; name: string } | null = null;

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe({
      next: (data: Notifications[]) => {
        this.notifications = data;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error); // Error handling
      },
    });
  }

  fetchNewNotifications(): void {
    this.notificationService.getNotifications().subscribe({
      next: (data: any[]) => {
        this.newNotifications = data;
      },
      error: (error) => {
        console.error('Error fetching new notifications:', error);
      }
    });
  }

  searchTerm: string = ''; // For the search input
  dropdownOpen: boolean = false; // For the dropdown visibility

  ngOnInit() {
    this.loadStatistics();
    this.setFilter('all');
    this.fetchNotifications();
    this.fetchNewNotifications();

    this.userRole = this.auth.getUserRole();
    const userInfo = this.auth.getUserInfo();

    if (userInfo) {
      const accountProfileName =
        this.getAccountNameService.getAccountProfileName();
      this.accountProfileName = accountProfileName?.accountProfileName ?? null;
      this.userEmail = userInfo.email;
    }

    this.route.fragment.subscribe((fragment) => {
      this.currentFragment = fragment;
    });
  }

  constructor() {
    this.lineChartOptions = {
      series: [
        {
          name: 'Reservations',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148], // Fake data
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      title: {
        text: 'Monthly Reservation Trends',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ], // Fake data
      },
      dataLabels: {
        enabled: false,
      },
    };

    this.barChartOptions = {
      series: [
        {
          name: '2021',
          data: [30, 40, 45, 50, 49, 60, 70, 91, 125], // Fake data
        },
        {
          name: '2022',
          data: [20, 30, 35, 40, 39, 50, 60, 81, 105], // Fake data
        },
        {
          name: '2023',
          data: [25, 35, 40, 45, 44, 55, 65, 85, 110], // Fake data
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'Monthly Reservation Compared Year-over-Year',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ], // Fake data
      },
      dataLabels: {
        enabled: false,
      },
    };

    this.areaChartOptions = {
      series: [
        {
          name: 'Package A',
          data: [20, 30, 40, 50, 60, 70, 80, 90, 100], // Fake data
        },
        {
          name: 'Package B',
          data: [15, 25, 35, 45, 55, 65, 75, 85, 95], // Fake data
        },
        {
          name: 'Package C',
          data: [10, 20, 30, 40, 50, 60, 70, 80, 90], // Fake data
        },
        {
          name: 'Package D',
          data: [5, 15, 25, 35, 45, 55, 65, 75, 85], // Fake data
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        stacked: true,
      },
      title: {
        text: 'Reservations of Event Packages by Month',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ], // Fake data
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
    };

    this.heatmapChartOptions = {
      series: [
        {
          name: 'Metric1',
          data: this.generateHeatmapData(9, { min: 0, max: 90 }),
        },
        {
          name: 'Metric2',
          data: this.generateHeatmapData(9, { min: 0, max: 90 }),
        },
        {
          name: 'Metric3',
          data: this.generateHeatmapData(9, { min: 0, max: 90 }),
        },
      ],
      chart: {
        height: 350,
        type: 'heatmap',
      },
      title: {
        text: 'Reservation Density by Day and Hour',
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 50,
                color: '#00A100',
              },
              {
                from: 51,
                to: 100,
                color: '#128FD9',
              },
            ],
          },
        },
      },
    };
  }

  goToReservations(id: string) {
    this.reservationService.getReservationById(id).subscribe({
      next: (reservation) => {
        // Add logic to navigate to reservation details page
        console.log('Navigating to reservation:', reservation);
      },
      error: (error) => {
        console.error('Error fetching reservation:', error); // Error handling
      },
    });
  }

  loadStatistics() {
    this.dashboardService.getStatistics().subscribe({
      next: (stats) => {
        this.inquiries = stats.inquiries;
        this.pending = stats.pending;
        this.approved = stats.approved;
      },
      error: (error) => {
        console.error('Error fetching statistics:', error); // Error handling
      },
    });
  }

  topFavoritePackages = [
    { name: 'Package A', count: 120 },
    { name: 'Package B', count: 95 },
    { name: 'Package C', count: 80 },
  ];

  leastSoldPackages = [
    { name: 'Package D', count: 10 },
    { name: 'Package E', count: 15 },
    { name: 'Package F', count: 20 },
  ];

  cards = [
    {
      title: 'Monthly Reservation Trends',
      content: 'Graph for reservations',
      category: 'monthly_reservations',
    },
    {
      title: 'Monthly Reservation Compared Year-over-Year',
      content: 'Graph for reservations',
      category: 'monthly_reservations_per_year',
    },
    {
      title: 'Reservations of Event Packages by Month',
      content: 'Graph for reservations',
      category: 'event_packages',
    },
    {
      title: 'Reservation Density by Day and Hour',
      content: 'Graph for reservations',
      category: 'reservation_density',
    },
  ];

  filteredCards = this.cards;

  adminEmail: string = '';
  adminPassword: string = '';
  admin: any; // Consider specifying a type for admin

  setFilter(filter: string): void {
    this.activeFilter = filter;
    if (filter === 'all') {
      this.filteredCards = this.cards;
    } else {
      this.filteredCards = this.cards.filter(
        (card) => card.category === filter
      );
    }
  }

  updateAccount(): void {
    // Add logic to handle account update (e.g., API call)
    console.log('Account updated:', {
      email: this.adminEmail,
      password: this.adminPassword,
    });
  }

  // Toggle the dropdown menu
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  generateHeatmapData(count: number, yrange: { min: number; max: number }) {
    const series = [];
    for (let i = 0; i < count; i++) {
      const x = `w${i + 1}`;
      const y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      series.push({ x, y });
    }
    return series;
  }

  goToNotifications() {
    this.router.navigate(['/admin/notifications']);
  }

  logout() {
    try {
      this.auth.logout();
      this.toastNotifications.showSuccess('Logged out successfully', 'Success');
    } catch (error) {
      console.error('Logout failed:', error);
      this.toastNotifications.showError('Logout failed. Please try again.', 'Error');
    }
  }
}
