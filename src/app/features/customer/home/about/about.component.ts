import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationFormComponent } from "../../reservation-form/reservation-form.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ReservationFormComponent, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
