import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DrawerComponent } from "../drawer/drawer.component";

@Component({
  selector: 'app-admin-review',
  standalone: true,
  imports: [MatIconModule, CommonModule, DrawerComponent],
  templateUrl: './admin-review.component.html',
  styleUrl: './admin-review.component.scss'
})
export class AdminReviewComponent {
  reviews = [
    {
      name: 'Jess Hopkins',
      rating: 4.5,
      date: 'Feb 13, 2021',
      content: 'Gorgeous design! Even more responsive than the previous version. A pleasure to use!',
    },
    {
      name: 'Alice Banks',
      rating: 5,
      date: 'Feb 13, 2021',
      content: 'The device has a clean design and the metal housing feels sturdy in my hands. Soft rounded corners make it a pleasure to look at.',
    },
  ];
}
