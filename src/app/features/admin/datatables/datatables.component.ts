import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { FormsModule } from '@angular/forms';
import { ViewReservationModalComponent } from '../reservation-modal-forms/view-reservation-modal.component';
import { AddReservationModalComponent } from '../reservation-modal-forms/add-reservation-modal.component';
import { EditReservationModalComponent } from '../reservation-modal-forms/edit-reservation-modal.component';
import { DeleteReservationModalComponent } from '../reservation-modal-forms/delete-reservation-modal.component';
import { RouterModule } from '@angular/router';
import { ReservationForm } from '../../../models/reservation-form';
import { ReservationService } from '../../../services/reservation.service';
import { GetPackageNameService } from '../../customer/reservation-form/getPackageName.service';

@Component({
  selector: 'app-datatables',
  standalone: true,
  imports: [
    DrawerComponent,
    CommonModule,
    FormsModule,
    ViewReservationModalComponent,
    AddReservationModalComponent,
    EditReservationModalComponent,
    DeleteReservationModalComponent,
    RouterModule,
  ],
  templateUrl: './datatables.component.html',
  styleUrls: ['./datatables.component.scss'],
})
export class DatatablesComponent implements OnInit {
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15, 20];
  viewingItem: any = null;
  addingItem: any = null;
  editingItem: any = null;
  deletingItem: any = null;
  selectedTab: string = 'all';
  router: any;

  private readonly reservationService = inject(ReservationService);
  private readonly packageNameService = inject(GetPackageNameService);
  public reservationData: ReservationForm[] = [];
  public packageMap: { [key: string]: string } = {};

  @Output() viewItemEvent = new EventEmitter<any>();
  @Output() addItemEvent = new EventEmitter<any>();
  @Output() editItemEvent = new EventEmitter<any>();
  @Output() deleteItemEvent = new EventEmitter<any>();

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getReservations().subscribe((data: any) => {
      this.reservationData = data;
    });
  }

  viewReservation(id: string) {
    this.reservationService
      .getReservationById(id)
      .subscribe((data: ReservationForm) => {
        this.viewingItem = data;
        this.viewItemEvent.emit(data);
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

  editReservation(id: string, reservation: ReservationForm) {
    this.reservationService
      .updateReservation(id, reservation)
      .subscribe((data: ReservationForm) => {
        this.editingItem = data;
        this.editItemEvent.emit(data);
        this.getReservations(); // Refresh the list
      });
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id).subscribe(() => {
      this.deletingItem = id;
      this.deleteItemEvent.emit(id);
      this.getReservations(); // Refresh the list
    });
  }

  filteredData() {
    return this.reservationData.filter(
      (item) =>
        item.contactNumber.toString().includes(this.searchText) ||
        item.numberOfPax.toString().includes(this.searchText) ||
        item.eventDate.toString().includes(this.searchText) ||
        item.eventTime.toString().includes(this.searchText) ||
        item.eventTheme.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.cakeTheme.toString().includes(this.searchText) ||
        item.otherRequest.toString().includes(this.searchText) ||
        item.status.toString().includes(this.searchText)
    );
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

  changeItemsPerPage() {
    this.currentPage = 1;
  }

  resetSearch() {
    this.searchText = '';
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

  openView(item: any) {
    this.viewingItem = item;
  }

  closeView() {
    this.viewingItem = null;
  }

  openEdit(item: any) {
    this.editingItem = item;
  }

  closeEdit() {
    this.editingItem = null;
  }

  openDelete(item: any) {
    this.deletingItem = item;
  }

  closeDelete() {
    this.deletingItem = null;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.currentPage = 1; // Reset to first page on tab change
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
