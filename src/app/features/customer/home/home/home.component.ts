import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { OffersComponent } from '../offers/offers.component';
import { ReviewSectionComponent } from '../review-section/review-section.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { MenuComponent } from "../../menu/menu.component";
import { ServicesComponent } from "../../services/services.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    OffersComponent,
    ReviewSectionComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ServicesComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
