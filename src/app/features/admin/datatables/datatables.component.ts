import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { FormsModule } from '@angular/forms';
import { ViewReservationModalComponent } from "../reservation-modal-forms/view-reservation-modal.component";
import { EditReservationModalComponent } from "../reservation-modal-forms/edit-reservation-modal.component";
import { DeleteReservationModalComponent } from "../reservation-modal-forms/delete-reservation-modal.component";


@Component({
  selector: 'app-datatables',
  standalone: true,
  imports: [DrawerComponent, CommonModule, FormsModule, ViewReservationModalComponent, EditReservationModalComponent, DeleteReservationModalComponent],
  templateUrl: './datatables.component.html',
  styleUrl: './datatables.component.scss'
})
export class DatatablesComponent {
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15, 20];
  viewingItem: any = null;
  editingItem: any = null;
  deletingItem: any = null;

  data = [
    {
        reservationID: 24121,
        packageType: "Standard Civil Wedding Package",
        customerName: "Kariza Smith",
        numberofPax: 58,
        reservationDate: "2021-09-25",
        reservationTime: "10:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24122,
        packageType: "Standard Civil Wedding Package",
        customerName: "Michael Williams",
        numberofPax: 110,
        reservationDate: "2021-09-25",
        reservationTime: "4:00 PM",
        status: "Pending"
    },
    {
        reservationID: 24123,
        packageType: "All-In 7th Birthday Party Package",
        customerName: "Mercy Jones",
        numberofPax: 50,
        reservationDate: "2021-09-25",
        reservationTime: "11:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24124,
        packageType: "All-In 7th Birthday Party Package",
        customerName: "Pia Smith",
        numberofPax: 125,
        reservationDate: "2021-09-25",
        reservationTime: "11:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24125,
        packageType: "All-In Christening & 1st Birthday Party Package",
        customerName: "Jonnabel Smith",
        numberofPax: 102,
        reservationDate: "2021-09-25",
        reservationTime: "11:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24126,
        packageType: "All-In 7th Birthday Party Package",
        customerName: "Kariza Brown",
        numberofPax: 58,
        reservationDate: "2021-09-25",
        reservationTime: "10:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24127,
        packageType: "All-In Christening & 1st Birthday Party Package",
        customerName: "Michael Smith",
        numberofPax: 110,
        reservationDate: "2021-09-25",
        reservationTime: "4:00 PM",
        status: "Pending"
    },
    {
        reservationID: 24128,
        packageType: "Small Celebrations",
        customerName: "Mercy Johnson",
        numberofPax: 50,
        reservationDate: "2021-09-25",
        reservationTime: "11:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24129,
        packageType: "All-In Christening & 1st Birthday Party Package",
        customerName: "Pia Davis",
        numberofPax: 125,
        reservationDate: "2021-09-25",
        reservationTime: "11:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24130,
        packageType: "All-In 7th Birthday Party Package",
        customerName: "Jonnabel Lee",
        numberofPax: 102,
        reservationDate: "2021-09-25",
        reservationTime: "11:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24131,
        packageType: "All-In 7th Birthday Party Package",
        customerName: "Kariza White",
        numberofPax: 58,
        reservationDate: "2021-09-25",
        reservationTime: "10:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24132,
        packageType: "Standard Civil Wedding Package",
        customerName: "Michael Brown",
        numberofPax: 110,
        reservationDate: "2021-09-25",
        reservationTime: "4:00 PM",
        status: "Pending"
    },
    {
        reservationID: 24133,
        packageType: "Small Celebrations",
        customerName: "Mercy Green",
        numberofPax: 50,
        reservationDate: "2021-09-25",
        reservationTime: "11:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24134,
        packageType: "All-In Christening & 1st Birthday Party Package",
        customerName: "Pia White",
        numberofPax: 125,
        reservationDate: "2021-09-25",
        reservationTime: "11:00 AM",
        status: "Pending"
    },
    {
        reservationID: 24135,
        packageType: "All-In 7th Birthday Party Package",
        customerName: "Jonnabel Brown",
        numberofPax: 102,
        reservationDate: "2021-09-25",
        reservationTime: "11:00 AM",
        status: "Pending"
    }
]

@Output() viewItemEvent = new EventEmitter<any>();
@Output() editItemEvent = new EventEmitter<any>();
@Output() deleteItemEvent = new EventEmitter<any>();

  filteredData() {
    return this.data.filter(item =>
      item.reservationID.toString().includes(this.searchText) ||
      item.packageType.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.customerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.numberofPax.toString().includes(this.searchText) ||
      item.reservationDate.toString().includes(this.searchText) ||
      item.reservationTime.toString().includes(this.searchText) ||
      item.status.toLowerCase().includes(this.searchText.toLowerCase())
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

 
  openView(item: any) {
    console.log('Opening view for:', item); // Debugging
    this.viewingItem = item;
  }

  closeView() {
    this.viewingItem = null;
  }

  openEdit(item: any) {
    console.log('Opening edit for:', item); // Debugging
    this.editingItem = item;
  }

  closeEdit() {
    this.editingItem = null;
  }

  saveEdit(editedItem: any) {
    // Update the item in the data array
    const index = this.data.findIndex(i => i.reservationID === editedItem.reservationID);
    if (index !== -1) {
      this.data[index] = editedItem;
    }
    this.closeEdit();
  }

  openDelete(item: any) {
    console.log('Opening delete for:', item); // Debugging
    this.deletingItem = item;
  }

  closeDelete() {
    this.deletingItem = null;
  }

  confirmDelete(item: any) {
    // Remove the item from the data array
    this.data = this.data.filter(i => i.reservationID !== item.reservationID);
    this.closeDelete();
  }
}
