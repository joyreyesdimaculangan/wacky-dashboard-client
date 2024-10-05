import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { FormsModule } from '@angular/forms';
import { ViewReservationModalComponent } from "../reservation-modal-forms/view-reservation-modal.component";
import { AddReservationModalComponent } from '../reservation-modal-forms/add-reservation-modal.component';
import { EditReservationModalComponent } from "../reservation-modal-forms/edit-reservation-modal.component";
import { DeleteReservationModalComponent } from "../reservation-modal-forms/delete-reservation-modal.component";
import { RouterModule } from '@angular/router';



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
    RouterModule
  ],
  templateUrl: './datatables.component.html',
  styleUrl: './datatables.component.scss'
})
export class DatatablesComponent {
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

  data = [
    {
      reservationID: 24121,
      packageType: "Standard Civil Wedding Package",
      name: "Kariza Smith",
      contactNumber: "0917-123-4567",
      numberOfPax: 58,
      eventDate: "2021-09-25",
      eventTime: "10:00 AM",
      eventTheme: "Classic Wedding",
      cakeTheme: "White & Gold",
      cakeMessage: "Congratulations, Kariza & John!",
      otherRequest: "Extra floral decorations",
      status: "Pending",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24122,
      packageType: "Standard Civil Wedding Package",
      name: "Michael Williams",
      contactNumber: "0918-234-5678",
      numberOfPax: 110,
      eventDate: "2021-09-25",
      eventTime: "4:00 PM",
      eventTheme: "Modern Wedding",
      cakeTheme: "Silver & Blue",
      cakeMessage: "Best Wishes, Michael & Sarah!",
      otherRequest: "Additional lighting",
      status: "Approved",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24123,
      packageType: "All-In 7th Birthday Party Package",
      name: "Mercy Jones",
      contactNumber: "0919-345-6789",
      numberOfPax: 50,
      eventDate: "2021-09-25",
      eventTime: "11:00 AM",
      eventTheme: "Princess Party",
      cakeTheme: "Pink Castle",
      cakeMessage: "Happy 7th Birthday, Mercy!",
      otherRequest: "Balloon arch at entrance",
      status: "Cancelled",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24124,
      packageType: "All-In 7th Birthday Party Package",
      name: "Pia Smith",
      contactNumber: "0917-456-7890",
      numberOfPax: 125,
      eventDate: "2021-09-25",
      eventTime: "11:00 AM",
      eventTheme: "Superhero Party",
      cakeTheme: "Superhero Logo",
      cakeMessage: "Happy 7th Birthday, Pia!",
      otherRequest: "Face painting station",
      status: "Approved",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24125,
      packageType: "All-In Christening & 1st Birthday Party Package",
      name: "Jonnabel Smith",
      contactNumber: "0918-567-8901",
      numberOfPax: 102,
      eventDate: "2021-09-25",
      eventTime: "11:00 AM",
      eventTheme: "Baby Animal Theme",
      cakeTheme: "Baby Animals",
      cakeMessage: "Happy 1st Birthday, Jonnabel!",
      otherRequest: "Photo booth with animal props",
      status: "Pending",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24126,
      packageType: "All-In 7th Birthday Party Package",
      name: "Kariza Brown",
      contactNumber: "0919-678-9012",
      numberOfPax: 58,
      eventDate: "2021-09-25",
      eventTime: "10:00 AM",
      eventTheme: "Fairy Tale Party",
      cakeTheme: "Fairy Castle",
      cakeMessage: "Happy 7th Birthday, Kariza!",
      otherRequest: "Magician show",
      status: "Cancelled",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24127,
      packageType: "All-In Christening & 1st Birthday Party Package",
      name: "Michael Smith",
      contactNumber: "0917-789-0123",
      numberOfPax: 110,
      eventDate: "2021-09-25",
      eventTime: "4:00 PM",
      eventTheme: "Jungle Adventure",
      cakeTheme: "Safari Animals",
      cakeMessage: "Happy 1st Birthday, Michael!",
      otherRequest: "Animal mascot appearance",
      status: "Approved",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24128,
      packageType: "Small Celebrations",
      name: "Mercy Johnson",
      contactNumber: "0918-890-1234",
      numberOfPax: 50,
      eventDate: "2021-09-25",
      eventTime: "11:00 AM",
      eventTheme: "Garden Party",
      cakeTheme: "Floral Design",
      cakeMessage: "Happy Celebration, Mercy!",
      otherRequest: "String lights for ambiance",
      status: "Pending",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24129,
      packageType: "All-In Christening & 1st Birthday Party Package",
      name: "Pia Davis",
      contactNumber: "0919-901-2345",
      numberOfPax: 125,
      eventDate: "2021-09-25",
      eventTime: "11:00 AM",
      eventTheme: "Under the Sea",
      cakeTheme: "Mermaid",
      cakeMessage: "Happy 1st Birthday, Pia!",
      otherRequest: "Mermaid performer",
      status: "Approved",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24130,
      packageType: "All-In 7th Birthday Party Package",
      name: "Jonnabel Lee",
      contactNumber: "0917-012-3456",
      numberOfPax: 102,
      eventDate: "2021-09-25",
      eventTime: "11:00 AM",
      eventTheme: "Pirate Adventure",
      cakeTheme: "Pirate Ship",
      cakeMessage: "Happy 7th Birthday, Jonnabel!",
      otherRequest: "Treasure hunt game",
      status: "Cancelled",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24131,
      packageType: "All-In 7th Birthday Party Package",
      name: "Kariza White",
      contactNumber: "0918-123-4567",
      numberOfPax: 58,
      eventDate: "2021-09-25",
      eventTime: "10:00 AM",
      eventTheme: "Space Explorer",
      cakeTheme: "Rocket Ship",
      cakeMessage: "Happy 7th Birthday, Kariza!",
      otherRequest: "Astronaut performer",
      status: "Approved",
      paymentStatus: "Fully Paid"
    },
    {
      reservationID: 24132,
      packageType: "Standard Civil Wedding Package",
      name: "Michael Brown",
      contactNumber: "0919-234-5678",
      numberOfPax: 110,
      eventDate: "2021-09-25",
      eventTime: "4:00 PM",
      eventTheme: "Rustic Wedding",
      cakeTheme: "Woodland Theme",
      cakeMessage: "Congratulations, Michael & Anna!",
      otherRequest: "Rustic wooden decor",
      status: "Pending",
      paymentStatus: "50% Downpayment"
    },
    {
      reservationID: 24133,
      packageType: "Small Celebrations",
      name: "Mercy Green",
      contactNumber: "0917-345-6789",
      numberOfPax: 50,
      eventDate: "2021-09-25",
      eventTime: "11:00 AM",
      eventTheme: "Picnic Party",
      cakeTheme: "Checkered Picnic",
      cakeMessage: "Happy Celebration, Mercy!",
      otherRequest: "Picnic-style seating",
      status: "Cancelled",
      paymentStatus: "Fully Paid"
    },
    {
      reservationID: 24134,
      packageType: "All-In Christening & 1st Birthday Party Package",
      name: "Pia White",
      contactNumber: "0918-456-7890",
      numberOfPax: 125,
      eventDate: "2021-09-25",
      eventTime: "11:00 AM",
      eventTheme: "Rainbow Theme",
      cakeTheme: "Rainbow Cake",
      cakeMessage: "Happy 1st Birthday, Pia!",
      otherRequest: "Rainbow balloon arch",
      status: "Approved",
      paymentStatus: "Fully Paid"
    },
    {
      reservationID: 24135,
      packageType: "All-In 7th Birthday Party Package",
      name: "Jonnabel Brown",
      contactNumber: "0919-567-8901",
      numberOfPax: 102,
      eventDate: "2021-09-25",
      eventTime: "11:00 AM",
      eventTheme: "Dinosaur Adventure",
      cakeTheme: "Dinosaur Cake",
      cakeMessage: "Happy 7th Birthday, Jonnabel!",
      otherRequest: "Dinosaur performer",
      status: "Pending",
      paymentStatus: "Fully Paid"
    }
  ];
  
  

@Output() viewItemEvent = new EventEmitter<any>();
@Output() addItemEvent = new EventEmitter<any>();
@Output() editItemEvent = new EventEmitter<any>();
@Output() deleteItemEvent = new EventEmitter<any>();

  filteredData() {
    return this.data.filter(item =>
      item.reservationID.toString().includes(this.searchText) ||
      item.packageType.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.contactNumber.toString().includes(this.searchText) ||
      item.numberOfPax.toString().includes(this.searchText) ||
      item.eventDate.toString().includes(this.searchText) ||
      item.eventTime.toString().includes(this.searchText) ||
      item.eventTheme.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.cakeTheme.toString().includes(this.searchText) ||
      item.cakeMessage.toString().includes(this.searchText) ||
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

  openAdd(item: any) {
    console.log('Opening view for:', item); // Debugging
    this.addingItem = item;
  }

  handleAdd(newItem: any) {
    this.data.push(newItem);
    this.closeAdd();
  }

  closeAdd() {
    this.addingItem = null;
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

  // Method to change the selected tab
  selectTab(tab: string) {
    this.selectedTab = tab;
    this.currentPage = 1; // Reset to first page on tab change
  }

  // Method to get filtered data based on selected tab
  getTabData() {
    if (this.selectedTab === 'all') {
      return this.filteredData();
    } else {
      return this.filteredData().filter(item => item.status.toLowerCase() === this.selectedTab);
    }
  }
}
