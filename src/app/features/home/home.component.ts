import { Component, inject, OnInit } from '@angular/core';
import { OffersComponent } from '../customer/offers-carousel/offers.component';
import { MenuComponent } from '../customer/menu/menu.component';
import { ServicesComponent } from '../customer/wackys-services/services.component';
import { ReviewSectionComponent } from '../customer/review-section/review-section.component';
import { InquiryFormComponent } from '../customer/contactUs/inquiry-form.component';
import { HeaderComponent } from '../customer/header/header.component';
import { FooterComponent } from '../customer/footer/footer.component';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    OffersComponent,
    ReviewSectionComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ServicesComponent,
    InquiryFormComponent,
    HeaderComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to fragment changes
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });

    // Check if there's a fragment on initial load
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });
  }

  private scrollToFragment(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
