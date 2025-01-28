import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  EditedReservationForm,
  ReservationForm,
} from '../../../models/reservation-form';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';
import { ReservationService } from '../../../services/reservation.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteReservationModalComponent } from '../../admin/reservation-modal-forms/delete-reservation-modal.component';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReservationModalComponent } from '../../admin/reservation-modal-forms/add-reservation-modal.component';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-confirmed-reservations',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DeleteReservationModalComponent,
    AddReservationModalComponent,
  ],
  providers: [ReservationService, DatePipe],
  template: `
    <div class="flex min-h-screen bg-gray-100">
    <section class="dashboard-page flex-1 overflow-auto">
      <div class="dashboard-content p-[clamp(1rem,3vw,2rem)]">
        <!-- Header -->
        <header class="mb-[clamp(2rem,5vw,3rem)] pb-4 border-b border-gray-200">
          <h1 class="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-green-700 ml-[clamp(1rem,2vw,2rem)]">
            Reservations
          </h1>
        </header>

          <div class="content">
            <!-- Loading State -->
            <div
              *ngIf="loading()"
              class="flex flex-col items-center justify-center p-[clamp(1rem,3vw,2rem)]"
            >
              <div
                class="spinner w-[clamp(2rem,6vw,3rem)] h-[clamp(2rem,6vw,3rem)]"
              ></div>
              <p
                class="mt-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.875rem,1.5vw,1rem)]"
              >
                Loading reservations...
              </p>
            </div>

            <main *ngIf="!loading()" class="flex-1 overflow-auto">
              <!-- Search and Controls Panel -->
              <div
                class="flex flex-col lg:flex-row justify-between gap-[clamp(1rem,3vw,1.5rem)] mb-[clamp(1.5rem,4vw,2rem)]"
              >
                <!-- Search Area -->
                <div
                  class="flex flex-col sm:flex-row gap-[clamp(0.75rem,2vw,1rem)]"
                >
                  <div
                    class="relative flex-1 sm:max-w-[clamp(250px,40vw,400px)]"
                  >
                    <svg
                      class="absolute left-3 top-1/2 -translate-y-1/2 w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)] text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
                      />
                    </svg>
                    <input
                      type="text"
                      [(ngModel)]="searchText"
                      placeholder="Search..."
                      class="w-full pl-[clamp(2.5rem,5vw,3rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] pr-[clamp(0.75rem,2vw,1rem)]
                              text-[clamp(0.875rem,1.5vw,1rem)] border border-gray-300 rounded-lg
                              focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                  <button
                    (click)="resetSearch()"
                    class="px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)]
                             text-[clamp(0.875rem,1.5vw,1rem)] bg-green-500 text-white rounded-lg
                             hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  >
                    Reset
                  </button>
                </div>
                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-[clamp(0.5rem,2vw,1rem)]">
                  <button
                    (click)="openAdd()"
                    class="px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)]
                             text-[clamp(0.875rem,1.5vw,1rem)] bg-green-500 text-white rounded-lg
                             hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  >
                    Add Reservation
                  </button>
                  <button
                    (click)="onClose()"
                    class="px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.5vw,0.75rem)]
                             text-[clamp(0.875rem,1.5vw,1rem)] bg-green-500 text-white rounded-lg
                             hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all duration-200"
                  >
                    Back
                  </button>
                </div>
              </div>

              <!-- Reservation Data Table -->
              <div
                class="overflow-x-auto mb-[clamp(1.5rem,4vw,2rem)] rounded-lg shadow"
              >
                <table class="min-w-full bg-white">
                  <thead class="bg-green-500 text-white">
                    <tr>
                      <th class="p-4 text-sm font-medium relative">
                        <div class="flex items-center justify-between">
                          <span>Package Type</span>
                          <button
                            class="ml-2 p-1 bg-white text-green-500 rounded-full hover:bg-green-100 focus:outline-none"
                            (click)="toggleFilter('packageType')"
                          >
                            <i class="material-icons text-sm">filter_list</i>
                          </button>
                        </div>
                        <input
                          *ngIf="showFilters.packageType"
                          type="text"
                          [(ngModel)]="filters.packageType"
                          placeholder="Filter by Package Type"
                          class="absolute top-full left-0 mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-gray-700"
                        />
                      </th>

                      <th class="p-4 text-sm font-medium relative">
                        <div class="flex items-center justify-between">
                          <span>No. of Guests</span>
                          <button
                            class="ml-2 p-1 bg-white text-green-500 rounded-full hover:bg-green-100 focus:outline-none"
                            (click)="toggleFilter('numberOfPax')"
                          >
                            <i class="material-icons text-sm">filter_list</i>
                          </button>
                        </div>
                        <input
                          *ngIf="showFilters.numberOfPax"
                          type="text"
                          [(ngModel)]="filters.numberOfPax"
                          placeholder="Filter by Number of Pax"
                          class="absolute top-full left-0 mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-gray-700"
                        />
                      </th>
                      <th class="p-4 text-sm font-medium relative">
                        <div class="flex items-center justify-between">
                          <span>Date</span>
                          <button
                            class="ml-2 p-1 bg-white text-green-500 rounded-full hover:bg-green-100 focus:outline-none"
                            (click)="toggleFilter('eventDate')"
                          >
                            <i class="material-icons text-sm">filter_list</i>
                          </button>
                        </div>
                        <input
                          *ngIf="showFilters.eventDate"
                          type="text"
                          [(ngModel)]="filters.eventDate"
                          placeholder="Filter by Date"
                          class="absolute top-full left-0 mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-gray-700"
                        />
                      </th>
                      <th class="p-4 text-sm font-medium relative">
                        <div class="flex items-center justify-between">
                          <span>Time</span>
                          <button
                            class="ml-2 p-1 bg-white text-green-500 rounded-full hover:bg-green-100 focus:outline-none"
                            (click)="toggleFilter('eventTime')"
                          >
                            <i class="material-icons text-sm">filter_list</i>
                          </button>
                        </div>
                        <input
                          *ngIf="showFilters.eventTime"
                          type="text"
                          [(ngModel)]="filters.eventTime"
                          placeholder="Filter by Time"
                          class="absolute top-full left-0 mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-gray-700"
                        />
                      </th>
                      <th class="p-4 text-sm font-medium relative">
                        <div class="flex items-center justify-between">
                          <span>Status</span>
                          <button
                            class="ml-2 p-1 bg-white text-green-500 rounded-full hover:bg-green-100 focus:outline-none"
                            (click)="toggleFilter('status')"
                          >
                            <i class="material-icons text-sm">filter_list</i>
                          </button>
                        </div>
                        <input
                          *ngIf="showFilters.status"
                          type="text"
                          [(ngModel)]="filters.status"
                          placeholder="Filter by Status"
                          class="absolute top-full left-0 mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-gray-700"
                        />
                      </th>
                      <th class="p-4 text-sm font-medium relative">
                        <div class="flex items-center justify-between">
                          <span>Payment Status</span>
                          <button
                            class="ml-2 p-1 bg-white text-green-500 rounded-full hover:bg-green-100 focus:outline-none"
                            (click)="toggleFilter('paymentStatus')"
                          >
                            <i class="material-icons text-sm">filter_list</i>
                          </button>
                        </div>
                        <input
                          *ngIf="showFilters.paymentStatus"
                          type="text"
                          [(ngModel)]="filters.paymentStatus"
                          placeholder="Filter by Payment Status"
                          class="absolute top-full left-0 mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-gray-700"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-700 divide-y divide-gray-200">
                    <tr
                      *ngFor="
                        let reservation of pagedData();
                        trackBy: trackById
                      "
                      (click)="viewReservation(reservation.reservationID)"
                    >
                      <td class="p-4">{{ reservation.package?.name }}</td>
                      <td class="p-4">{{ reservation.numberOfPax }}</td>
                      <td class="p-4">{{ reservation.eventDate | date }}</td>
                      <td class="p-4">{{ reservation.eventTime }}</td>
                      <td class="p-4">
                        <span
                          [ngClass]="{
                            'bg-yellow-100 text-yellow-600':
                              reservation.status === 'Pending',
                            'bg-green-100 text-green-600':
                              reservation.status === 'Approved',
                            'bg-red-100 text-red-600':
                              reservation.status === 'Cancelled'
                          }"
                          class="px-3 py-1 text-xs font-medium rounded-lg"
                        >
                          {{ reservation.status }}
                        </span>
                      </td>
                      <td class="p-4">
                        <span
                          [ngClass]="{
                            'bg-yellow-100 text-yellow-600':
                              reservation.paymentStatus === 'PENDING',
                            'bg-green-100 text-green-600':
                              reservation.paymentStatus === 'FULLY_PAID',
                            'bg-blue-100 text-blue-600':
                              reservation.paymentStatus === 'PARTIALLY_PAID'
                          }"
                          class="px-3 py-1 text-xs font-medium rounded-lg"
                        >
                          {{ reservation.paymentStatus }}
                        </span>
                      </td>
                    </tr>
                    <tr *ngIf="pagedData().length === 0">
                      <td colspan="9" class="text-center py-4 text-red-500">
                        No results found.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Modals for Deleting -->
              <div class="modal-container overflow-auto max-h-screen z-50">
                <app-delete-reservation-modal
                  *ngIf="deletingItem"
                  [item]="deletingItem"
                  (cancelDelete)="closeDelete()"
                ></app-delete-reservation-modal>
              </div>

              <div
                class="flex flex-col sm:flex-row justify-between items-center gap-[clamp(1rem,3vw,1.5rem)]"
              >
                <div class="flex items-center gap-[clamp(0.5rem,2vw,1rem)]">
                  <label
                    for="itemsPerPage"
                    class="text-[clamp(0.875rem,1.5vw,1rem)]"
                    >Items per page:</label
                  >
                  <select
                    id="itemsPerPage"
                    [(ngModel)]="itemsPerPage"
                    (change)="changeItemsPerPage($event)"
                    class="text-[clamp(0.875rem,1.5vw,1rem)] 
                             py-[clamp(0.375rem,1vw,0.5rem)] px-[clamp(0.75rem,2vw,1rem)]
                             border border-gray-300 rounded-lg"
                  >
                    <option
                      *ngFor="let option of itemsPerPageOptions"
                      [value]="option"
                    >
                      {{ option }} per page
                    </option>
                  </select>
                </div>

                <div class="flex items-center gap-[clamp(0.75rem,2vw,1rem)]">
                  <button
                    (click)="prevPage()"
                    [disabled]="currentPage === 1"
                    class="px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)]
                             text-[clamp(0.875rem,1.5vw,1rem)] bg-green-500 text-white rounded-lg
                             hover:bg-green-600 focus:ring-2 focus:ring-green-500 
                             disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Previous
                  </button>
                  <span class="text-[clamp(0.875rem,1.5vw,1rem)]">
                    Page {{ currentPage }} of {{ totalPages() }}
                  </span>
                  <button
                    (click)="nextPage()"
                    [disabled]="currentPage === totalPages()"
                    class="px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)]
                             text-[clamp(0.875rem,1.5vw,1rem)] bg-green-500 text-white rounded-lg
                             hover:bg-green-600 focus:ring-2 focus:ring-green-500 
                             disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>

              <!-- Modals -->
              <div class="modal-container overflow-auto max-h-screen z-50">
                <app-delete-reservation-modal
                  *ngIf="deletingItem"
                  [item]="deletingItem"
                  (cancelDelete)="closeDelete()"
                >
                </app-delete-reservation-modal>

                <app-add-reservation-modal
                  *ngIf="addingItem"
                  (close)="closeAdd()"
                  (add)="handleAdd($event)"
                >
                </app-add-reservation-modal>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrl: './confirmed-reservations.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmedReservationsComponent implements OnInit {
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15, 20];
  viewingItem: EditedReservationForm | any = null;
  addingItem: EditedReservationForm | any = null;
  editingItem: EditedReservationForm | any = null;
  deletingItem: EditedReservationForm | any = null;
  selectedTab: string = 'all';
  toastNotifications = inject(ToastNotificationsComponent);
  reservations: EditedReservationForm[] = [];

  accountProfileId: string | undefined = undefined;
  location = inject(Location);
  loading = signal<boolean>(true);
  errorMessage: string | null = null;

  private readonly reservationService = inject(ReservationService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly datePipe = inject(DatePipe);
  private readonly authService = inject(AuthService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  public reservationData: EditedReservationForm[] = [];
  public packageMap: { [key: string]: string } = {};

  filters = {
    packageType: '',
    name: '',
    contactNumber: '',
    numberOfPax: '',
    eventDate: '',
    eventTime: '',
    status: '',
    paymentStatus: '',
  };

  showFilters = {
    packageType: false,
    name: false,
    contactNumber: false,
    numberOfPax: false,
    eventDate: false,
    eventTime: false,
    status: false,
    paymentStatus: false,
  };

  @Output() viewItemEvent = new EventEmitter<any>();
  @Output() addItemEvent = new EventEmitter<any>();
  @Output() editItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.accountProfileId = this.authService.user()?.accountProfileId;
    if (this.accountProfileId) {
      this.fetchCustomerReservations(this.accountProfileId);
    }
  }

  fetchCustomerReservations(accountProfileId: string): void {
    // Use fake data instead of making an API call
    this.reservationService
      .getReservationByAccountProfileId(accountProfileId)
      .subscribe({
        next: (data: EditedReservationForm[]) => {
          this.reservationData = data;
        },
        complete: () => {
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error fetching reservations:', error); // Error handling
        },
      });
  }
  getReservations() {
    this.reservationService.getReservations().subscribe({
      next: (data: EditedReservationForm[]) => {
        this.reservationData = data;
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error fetching reservations:', error); // Error handling
      },
    });
  }

  getReservationsId() {
    const reservationId = this.route.snapshot.params['reservationID'];
    console.log('Reservation ID:', reservationId);
    this.reservationService.getReservationById(reservationId).subscribe({
      next: (reservation) => {
        const index = this.reservationData.findIndex(
          (item) => item.reservationID === reservationId
        );
        if (index !== -1) {
          this.reservationData[index] = reservation;
        }
      },
      error: (error) => {
        console.error('Error fetching reservation:', error);
      },
    });
  }

  markAsRead(reservationId: string): void {
    this.reservationService.markAsRead(reservationId).subscribe({
      next: () => {
        this.reservationData = this.reservationData.map((reservation) =>
          reservation.reservationID === reservationId
            ? { ...reservation, isNew: false }
            : reservation
        );
      },
      error: (error) => {
        console.error('Error marking reservation as read:', error);
      },
    });
  }

  markAllAsRead(): void {
    this.reservationService.markAllAsRead().subscribe({
      next: () => {
        this.reservationData = this.reservationData.map((reservation) => ({
          ...reservation,
          isNew: false,
        }));
      },
      error: (error) => {
        console.error('Error marking all reservations as read:', error);
      },
    });
  }

  trackById(index: number, item: any): string {
    return item.reservationId || index.toString();
  }

  viewReservation(reservationID: string) {
    this.router.navigate(['/admin/view-reservations', reservationID]);
  }

  openEdit(reservationID: string) {
    this.router.navigate(['/admin/edit-reservations', reservationID]);
  }

  filteredData() {
    return this.reservationData.filter((item) => {
      const formattedEventDate = this.datePipe.transform(
        item.eventDate,
        'MM/dd/yyyy'
      );
      const packageName = item.package?.name || '';

      return (
        (this.filters.packageType
          ? item.package?.name &&
            packageName
              .toLowerCase()
              .includes(this.filters.packageType.toLowerCase())
          : true) &&
        (this.filters.name
          ? item.name.toLowerCase().includes(this.filters.name.toLowerCase())
          : true) &&
        (this.filters.contactNumber
          ? item.contactNumber.toString().includes(this.filters.contactNumber)
          : true) &&
        (this.filters.numberOfPax
          ? item.numberOfPax.toString().includes(this.filters.numberOfPax)
          : true) &&
        (this.filters.eventDate
          ? formattedEventDate &&
            formattedEventDate.includes(this.filters.eventDate)
          : true) &&
        (this.filters.eventTime
          ? item.eventTime.toString().includes(this.filters.eventTime)
          : true) &&
        (this.filters.status
          ? item.status
              .toLowerCase()
              .includes(this.filters.status.toLowerCase())
          : true) &&
        (this.filters.paymentStatus
          ? item.paymentStatus
              .toLowerCase()
              .includes(this.filters.paymentStatus.toLowerCase())
          : true) &&
        (this.searchText
          ? item.package?.name
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
            item.contactNumber.toString().includes(this.searchText) ||
            item.numberOfPax.toString().includes(this.searchText) ||
            (formattedEventDate &&
              formattedEventDate.includes(this.searchText)) ||
            item.eventTime.toString().includes(this.searchText) ||
            item.eventTheme
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            item.cakeTheme
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            item.otherRequest
              .toLowerCase()
              .includes(this.searchText.toLowerCase()) ||
            item.status.toLowerCase().includes(this.searchText.toLowerCase()) ||
            item.paymentStatus
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
          : true)
      );
    });
  }

  toggleFilter(column: keyof typeof this.showFilters) {
    this.showFilters[column] = !this.showFilters[column];
  }

  pagedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData().slice(start, end);
  }

  totalPages() {
    return Math.ceil(this.filteredData().length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  changeItemsPerPage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      this.itemsPerPage = parseInt(selectElement.value, 10);
      this.currentPage = 1; // Reset to first page
    }
  }

  resetSearch() {
    this.searchText = '';
    this.filters = {
      packageType: '',
      name: '',
      contactNumber: '',
      numberOfPax: '',
      eventDate: '',
      eventTime: '',
      status: '',
      paymentStatus: '',
    };
  }

  openAdd() {
    this.addingItem = {};
  }

  handleAdd(newItem: any) {
    this.reservationData.push(newItem);
    this.closeAdd();
  }

  closeAdd() {
    this.addingItem = null;
  }

  closeView() {
    this.viewingItem = null;
  }

  closeEdit() {
    this.editingItem = null;
  }

  closeDelete() {
    this.deletingItem = null;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.currentPage = 1; // Reset to first page on tab change
  }

  onClose() {
    this.location.back();
  }

  getTabData() {
    if (this.selectedTab === 'all') {
      return this.filteredData();
    } else {
      return this.filteredData().filter(
        (item) => item.status.toLowerCase() === this.selectedTab
      );
    }
  }
}
