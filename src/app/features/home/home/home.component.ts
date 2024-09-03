import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { OffersComponent } from '../offers/offers.component';
import { PackagesComponent } from '../packages/packages.component';
import { ReviewSectionComponent } from '../review-section/review-section.component';
import { BuffetComponent } from '../buffet/buffet.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    OffersComponent,
    PackagesComponent,
    ReviewSectionComponent,
    BuffetComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
