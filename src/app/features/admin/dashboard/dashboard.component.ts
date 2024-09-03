import { Component } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DrawerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
