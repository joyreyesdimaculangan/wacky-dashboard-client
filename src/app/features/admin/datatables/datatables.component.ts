import { CommonModule, Location } from '@angular/common';
import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { FormsModule } from '@angular/forms';
import { ViewReservationModalComponent } from '../reservation-modal-forms/view-reservation-modal.component';
import { AddReservationModalComponent } from '../reservation-modal-forms/add-reservation-modal.component';
import { EditReservationModalComponent } from '../reservation-modal-forms/edit-reservation-modal.component';
import { DeleteReservationModalComponent } from '../reservation-modal-forms/delete-reservation-modal.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  EditedReservationForm,
  ReservationForm,
} from '../../../models/reservation-form';
import { ReservationService } from '../../../services/reservation.service';
import { GetPackageNameService } from '../../customer/reservation-form/getPackageName.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';

@Component({
  selector: 'app-datatables',
  standalone: true,
  imports: [
    DrawerComponent,
    CommonModule,
    FormsModule,
    AddReservationModalComponent,
    DeleteReservationModalComponent,
    RouterModule,
  ],
  providers: [DatePipe],
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.scss'],
})
export class DatatablesComponent implements OnInit {
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

  location = inject(Location);
  loading = true;
  errorMessage: string | null = null;

  private readonly reservationService = inject(ReservationService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly datePipe = inject(DatePipe);
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
    paymentStatus: ''
  };

  showFilters = {
    packageType: false,
    name: false,
    contactNumber: false,
    numberOfPax: false,
    eventDate: false,
    eventTime: false,
    status: false,
    paymentStatus: false
  };

  @Output() viewItemEvent = new EventEmitter<any>();
  @Output() addItemEvent = new EventEmitter<any>();
  @Output() editItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.getReservations();
  }


  getReservations() {
    this.reservationService.getReservations().subscribe({
      next: (data: EditedReservationForm[]) => {
        this.reservationData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching reservations:', error); // Error handling
      }
    });
  }

  getReservationsId() {
    const reservationId = this.route.snapshot.params['reservationID'];
    console.log('Reservation ID:', reservationId);
    this.reservationService.getReservationById(reservationId).subscribe({
      next: (reservation) => {
        const index = this.reservationData.findIndex(item => item.reservationID === reservationId);
        if (index !== -1) {
          this.reservationData[index] = reservation;
        }
      },
      error: (error) => {
        console.error('Error fetching reservation:', error);
      }
    });
  }

  markAsRead(reservationId: string): void {
    this.reservationService.markAsRead(reservationId).subscribe({
      next: () => {
        this.reservationData = this.reservationData.map(reservation =>
          reservation.reservationID === reservationId ? { ...reservation, isNew: false } : reservation
        );
      },
      error: (error) => {
        console.error('Error marking reservation as read:', error);
      }
    });
  }

  markAllAsRead(): void {
    this.reservationService.markAllAsRead().subscribe({
      next: () => {
        this.reservationData = this.reservationData.map(reservation => ({
          ...reservation,
          isNew: false
        }));
      },
      error: (error) => {
        console.error('Error marking all reservations as read:', error);
      }
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

  openDelete(id: string) {
    const matdialogRef = this.dialog.open(DeleteReservationModalComponent, {
      data: {
        message:
          'Are you sure you want to delete this reservation? This action is irreversible and cannot be undone.',
      },
    });

    matdialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reservationService
          .deleteReservation(id)
          .subscribe(() => {
            this.deletingItem = id;
            this.deleteItemEvent.emit(id);
            console.log('Reservation deleted successfully', id);
            this.getReservations(); // Refresh the list
            this.toastNotifications.showSuccess('Reservation deleted successfully', 'Success');
          });
      } else
        (error: any) => {
          console.error('Error deleting selected items:', error);
          this.toastNotifications.showError('Error deleting selected items', 'Error');
        };
    });
  }

  addReservation(reservation: ReservationForm) {
    this.reservationService
      .createReservation(reservation)
      .subscribe((data: ReservationForm) => {
        this.addingItem = data;
        this.addItemEvent.emit(data);
        this.getReservations(); // Refresh the list
      });
  }

  editReservation(reservationID: string, reservation: ReservationForm) {
    this.reservationService
      .updateReservation(reservationID, reservation)
      .subscribe((data: ReservationForm) => {
        this.editingItem = data;
        this.editItemEvent.emit(data);
        this.getReservations(); // Refresh the list
      });
  }

  deleteReservation(reservationID: string) {
    this.reservationService.deleteReservation(reservationID).subscribe(() => {
      this.deletingItem = reservationID;
      this.deleteItemEvent.emit(reservationID);
      this.getReservations(); // Refresh the list
    });
  }

  sortReservationsByDate(data: ReservationForm[]): ReservationForm[] {
    return data.sort((a, b) => {
      const dateA = new Date(a.eventDate).getTime();
      const dateB = new Date(b.eventDate).getTime();
      return dateB - dateA; // Descending order (recent to old)
    });
  }

  filteredData() {
    // First apply all filters
    const filtered = this.reservationData.filter((item) => {
      const formattedEventDate = this.datePipe.transform(item.eventDate, 'MM/dd/yyyy');
      const packageName = item.package?.name || '';
  
      return (
        (this.filters.packageType ? (item.package?.name && packageName.toLowerCase().includes(this.filters.packageType.toLowerCase())) : true) &&
        (this.filters.name ? item.name.toLowerCase().includes(this.filters.name.toLowerCase()) : true) &&
        (this.filters.contactNumber ? item.contactNumber.toString().includes(this.filters.contactNumber) : true) &&
        (this.filters.numberOfPax ? item.numberOfPax.toString().includes(this.filters.numberOfPax) : true) &&
        (this.filters.eventDate ? (formattedEventDate && formattedEventDate.includes(this.filters.eventDate)) : true) &&
        (this.filters.eventTime ? item.eventTime.toString().includes(this.filters.eventTime) : true) &&
        (this.filters.status ? item.status.toLowerCase().includes(this.filters.status.toLowerCase()) : true) &&
        (this.filters.paymentStatus ? item.paymentStatus.toLowerCase().includes(this.filters.paymentStatus.toLowerCase()) : true)
      );
    });
  
    // Then sort by date (most recent first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.eventDate).getTime();
      const dateB = new Date(b.eventDate).getTime();
      return dateA - dateB;
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
      paymentStatus: ''
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
