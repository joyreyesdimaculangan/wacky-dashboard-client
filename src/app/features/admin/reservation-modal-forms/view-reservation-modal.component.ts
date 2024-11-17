import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
} from '@angular/core';
import {
  EditedReservationForm,
} from '../../../models/reservation-form';
import { ReservationService } from '../../../services/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-reservation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="flex-1 bg-green-100 min-h-screen flex flex-col sticky top-0 z-50"
    >
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          <button
            (click)="closeView()"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-3xl p-2 rounded-full focus:outline-none"
          >
            &times;
          </button>

          <!-- Page Header -->
          <h2 class="text-2xl font-semibold mb-6 text-green-700 border-b pb-4">
            View Reservation Details
          </h2>

          <!-- Reservation Details (Pre-filled Input Fields) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                for="reservationID"
                class="block text-sm font-medium text-gray-600"
                >Reservation ID</label
              >
              <input
                id="reservationID"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.reservationID"
                readonly
              />
            </div>

            <div>
              <label
                for="packageType"
                class="block text-sm font-medium text-gray-600"
                >Package Type</label
              >
              <input
                id="packageType"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.packageID"
                readonly
              />
            </div>

            <div>
              <label
                for="customerName"
                class="block text-sm font-medium text-gray-600"
                >Customer Name</label
              >
              <input
                id="customerName"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.name"
                readonly
              />
            </div>

            <div>
              <label
                for="contactNumber"
                class="block text-sm font-medium text-gray-600"
                >Contact Number</label
              >
              <input
                id="contactNumber"
                type="number"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.contactNumber"
                readonly
              />
            </div>

            <div>
              <label
                for="numberOfPax"
                class="block text-sm font-medium text-gray-600"
                >Number of Pax</label
              >
              <input
                id="numberOfPax"
                type="number"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.numberOfPax"
                readonly
              />
            </div>

            <div>
              <label
                for="eventDate"
                class="block text-sm font-medium text-gray-600"
                >Reservation Date</label
              >
              <input
                id="eventDate"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.eventDate | date : 'mediumDate'"
                readonly
              />
            </div>

            <div>
              <label
                for="eventTime"
                class="block text-sm font-medium text-gray-600"
                >Reservation Time</label
              >
              <input
                id="eventTime"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.eventTime"
                readonly
              />
            </div>

            <div>
              <label
                for="eventTheme"
                class="block text-sm font-medium text-gray-600"
                >Event Theme</label
              >
              <input
                id="eventTheme"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.eventTheme"
                readonly
              />
            </div>

            <div>
              <label
                for="cakeTheme"
                class="block text-sm font-medium text-gray-600"
                >Cake Theme</label
              >
              <input
                id="cakeTheme"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.cakeTheme"
                readonly
              />
            </div>

            <div>
              <label
                for="otherRequests"
                class="block text-sm font-medium text-gray-600"
                >Other Requests</label
              >
              <textarea
                id="otherRequests"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.otherRequest"
                readonly
              ></textarea>
            </div>

            <div>
              <label
                for="addOns"
                class="block text-sm font-medium text-gray-600"
                >Add Ons</label
              >
              <textarea
                id="addOns"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.addOnIds?.join(', ') || ''"
                readonly
              ></textarea>
            </div>

            <div>
              <label
                for="status"
                class="block text-sm font-medium text-gray-600"
                >Status</label
              >
              <input
                id="status"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.status"
                readonly
              />
            </div>

            <div>
              <label
                for="paymentStatus"
                class="block text-sm font-medium text-gray-600"
                >Payment Status</label
              >
              <input
                id="paymentStatus"
                type="text"
                class="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-3 text-gray-900"
                [value]="item?.paymentStatus"
                readonly
              />
            </div>
          </div>

          <!-- Modal Footer with Close Button -->
          <div class="mt-8 flex justify-end">
            <button
              (click)="closeView()"
              class="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-600 shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./view-reservation-modal.component.scss'],
})
export class ViewReservationModalComponent {
  item: EditedReservationForm | null = null;

  private readonly reservationService = inject(ReservationService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  ngOnInit() {
    this.getReservationById();
  }

  getReservationById() {
    const reservationID = this.route.snapshot.params['reservationID'];
    this.reservationService
      .getReservationById(reservationID)
      .subscribe((reservation) => {
        this.item = reservation;
      });
  }

  closeView() {
    this.location.back(); // Navigate back to reservations list
  }
}
