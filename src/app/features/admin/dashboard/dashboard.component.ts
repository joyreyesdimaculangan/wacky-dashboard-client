import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
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
import { PushNotificationService } from '../../../services/pushNotification.service';
import { DescriptiveAnalyticsService } from '../../../services/descriptiveAnalytics.service';
import { PrescriptiveAnalyticsService } from '../../../services/prescriptiveAnalytics.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  fill?: ApexFill;
  plotOptions?: ApexPlotOptions;
  tooltip?: ApexTooltip;
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
  cancelled: number = 0;
  pending: number = 0;
  approved: number = 0;
  reservationsByTime: any[] = [];

  accountProfileName: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  auth = inject(AuthService);
  router = inject(Router);

  location = inject(Location);
  loading = true;
  errorMessage: string | null = null;

  userRole: string | null = null;

  chartSeries: ApexAxisChartSeries = [];
  public lineChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public areaChartOptions!: Partial<ChartOptions>;
  public heatmapChartOptions!: Partial<ChartOptions>;

  topFavoritePackages: { name: string; count: number }[] = [];
  leastSoldPackages: { name: string; count: number }[] = [];
  recommendations: { package: string; insights: string; actions: string[] }[] = [];

  analyticsData: any;
  private route = inject(ActivatedRoute);
  currentFragment: string | null = null;

  private readonly toastNotifications = inject(ToastNotificationsComponent);
  private readonly getAccountNameService = inject(GetAccountIdService);
  private readonly notificationService = inject(NotificationsService);
  private readonly reservationService = inject(ReservationService);
  private readonly dashboardService = inject(DashboardService);
  public authService = inject(AuthService);
  private descriptiveAnalyticsService = inject(DescriptiveAnalyticsService);
  accountInfo: { id: string; name: string } | null = null;
  public selectedYear: number = new Date().getFullYear();
  private analyticsService = inject(PrescriptiveAnalyticsService);

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
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching new notifications:', error);
      },
    });
  }

  searchTerm: string = ''; // For the search input
  dropdownOpen: boolean = false; // For the dropdown visibility

  ngOnInit() {
    this.loadStatistics();
    this.setFilter('all');
    this.fetchNotifications();
    this.fetchNewNotifications();
    this.fetchYearOverYearData();
    this.fetchMonthlyTrends(this.selectedYear);
    this.fetchMonthlyTrendsofPackages(this.selectedYear);
    this.fetchReservationsByTime(this.selectedYear);
    this.fetchPrescriptiveAnalytics();

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

  fetchMonthlyTrends(year: number) {
    this.descriptiveAnalyticsService.getMonthlyTrends(year).subscribe(
      (data) => {
        this.lineChartOptions = {
          series: [
            {
              name: 'Reservations',
              data: data.monthlyTrends, // Array of reservation counts
            },
          ],
          chart: {
            type: 'line', // You can switch to 'bar' if needed
            height: 350,
          },
          dataLabels: {
            enabled: true,
          },
          xaxis: {
            categories: data.months, // Array of month names
            title: {
              text: 'Months',
            },
          },
          yaxis: {
            title: {
              text: 'Number of Reservations',
            },
          },
          title: {
            text: `Monthly Reservation Trends - ${year}`,
            align: 'center',
          },
        };
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onYearChange(year: number): void {
    this.selectedYear = year;
    this.fetchMonthlyTrends(year);
  }

  fetchYearOverYearData() {
    this.descriptiveAnalyticsService.getAnalyticsYearOverYear().subscribe(
      (data) => {
        console.log(data);

        const yearData = data.yearData;

        // Extract series and categories
        const series = yearData.map((year: any) => ({
          name: year.year,
          data: this.getMonthlyCounts(year.months),
        }));

        const categories = this.getMonthNames(); // Months for X-axis

        // Configure chart options
        this.barChartOptions = {
          series: series,
          chart: {
            type: 'bar',
            height: 350,
            stacked: true, // Enable stacked bars
          },
          xaxis: {
            categories: categories,
            title: {
              text: 'Months',
            },
          },
          title: {
            text: 'Year-over-Year Reservations',
            align: 'center',
          },
        };
      },
      (error) => {
        console.error('Error fetching year-over-year data:', error);
      }
    );
  }

  getMonthlyCounts(months: any[]): number[] {
    const allMonths = this.getMonthNames();
    const counts = Array(12).fill(0); // Initialize counts for all 12 months

    months.forEach((month: any) => {
      const index = allMonths.indexOf(month.month); // Find month index
      if (index !== -1) {
        counts[index] = month.count; // Assign count to corresponding month
      }
    });

    return counts;
  }

  getMonthNames(): string[] {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  }

  fetchMonthlyTrendsofPackages(year: number) {
    this.descriptiveAnalyticsService.getMonthlyTrendsOfPackages(year).subscribe(
      (data) => {
        const trends = data.monthlyTrends;
        const series = this.formatSeries(trends);
        const categories = trends.map((trend: any) => trend.month);

        // Configure chart options
        this.areaChartOptions = {
          series: series,
          chart: {
            type: 'area',
            height: 400,
            stacked: true, // Stacked bars for package comparison
          },
          xaxis: {
            categories: categories,
            title: {
              text: 'Months',
            },
          },
          yaxis: {
            title: {
              text: 'Reservations',
            },
          },
          title: {
            text: 'Monthly Trends of Packages',
            align: 'center',
          },
          dataLabels: {
            enabled: true,
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100],
            },
          },
        };
      },
      (error) => {
        console.error('Error fetching monthly trends:', error);
      }
    );
  }

  formatSeries(trends: any[]): any[] {
    const packageNames = new Set<string>();

    // Collect unique package names
    trends.forEach((trend) => {
      trend.packages.forEach((pkg: any) => packageNames.add(pkg.packageName));
    });

    // Format series data for each package
    return Array.from(packageNames).map((packageName) => ({
      name: packageName,
      data: trends.map((trend) => {
        const pkg = trend.packages.find(
          (p: any) => p.packageName === packageName
        );
        return pkg ? parseInt(pkg.reservations, 10) : 0; // Use 0 if no data
      }),
    }));
  }

  fetchReservationsByTime(year: number) {
    this.descriptiveAnalyticsService.getReservationsByTime(year).subscribe(
      (data) => {
        console.log('API Response:', data);
        this.reservationsByTime = data;
        this.prepareHeatmapData();
      },
      (error) => {
        console.error('Error fetching reservations by time:', error);
      }
    );
  }

  prepareHeatmapData(): void {
    if (!Array.isArray(this.reservationsByTime)) {
      console.error(
        'Expected reservationsByTime to be an array, but got:',
        this.reservationsByTime
      );
      this.chartSeries = [];
      return;
    }

    // Prepare the series data for the heatmap
    const lunchData: { x: string; y: string; value: number }[] = [];
    const dinnerData: { x: string; y: string; value: number }[] = [];

    // Map the data into two separate arrays: one for Lunch and one for Dinner
    this.reservationsByTime.forEach((item) => {
      lunchData.push({
        x: item.month, // Month on the x-axis
        y: 'Lunch', // Y-axis is "Lunch"
        value: item.lunch || 0, // Reservation count for Lunch
      });

      dinnerData.push({
        x: item.month, // Month on the x-axis
        y: 'Dinner', // Y-axis is "Dinner"
        value: item.dinner || 0, // Reservation count for Dinner
      });
    });

    // The data needs to be structured into a series format as per ApexCharts
    this.chartSeries = [
      {
        name: 'Lunch',
        data: lunchData.map((item) => ({ x: item.x, y: item.value })), // x: month, y: value (reservations for Lunch)
      },
      {
        name: 'Dinner',
        data: dinnerData.map((item) => ({ x: item.x, y: item.value })), // x: month, y: value (reservations for Dinner)
      },
    ];

    // Set up the chart options
    this.heatmapChartOptions = {
      chart: {
        type: 'heatmap',
        height: 450,
      },
      title: {
        text: `Heatmap of Reservations by Time (${this.selectedYear})`,
        align: 'center',
      },
      xaxis: {
        categories: this.reservationsByTime.map((item) => item.month), // Months as x-axis categories
        title: { text: 'Month' },
      },
      yaxis: {
        labels: {
          formatter: (value) => ['Lunch', 'Dinner'][value - 1], // Lunch and Dinner on the y-axis
        },
        title: { text: 'Meal Time' },
      },
      dataLabels: {
        enabled: true,
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          colorScale: {
            ranges: [
              { from: 0, to: 10, color: '#00A100', name: 'Low' },
              { from: 11, to: 50, color: '#128FD9', name: 'Medium' },
              { from: 51, to: 100, color: '#FFB200', name: 'High' },
              { from: 101, to: 500, color: '#FF0000', name: 'Very High' },
            ],
          },
        },
      },
      tooltip: {
        enabled: true,
        shared: true,
        y: {
          formatter: (value: number) => `${value} Reservations`,
        },
      },
    };
  }

  fetchPrescriptiveAnalytics(): void {
    this.analyticsService.getPrescriptiveAnalytics().subscribe(
      (data) => {
        if (data.status === 'success') {
          this.topFavoritePackages = data.data.topFavoritePackages;
          this.leastSoldPackages = data.data.leastFavoritePackages;
          this.analyticsData = data.data.insights;
        } else {
          console.error('Error fetching analytics data');
        }
      },
      (error) => {
        console.error('An error occurred while fetching analytics data', error);
      }
    );
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
        this.cancelled = stats.cancelled;
        this.pending = stats.pending;
        this.approved = stats.approved;
      },
      error: (error) => {
        console.error('Error fetching statistics:', error); // Error handling
      },
    });
  }

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
      title: 'Reservation Density by Month and Hour',
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
      this.toastNotifications.showError(
        'Logout failed. Please try again.',
        'Error'
      );
    }
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  onClose() {
    this.location.back();
  }
}
