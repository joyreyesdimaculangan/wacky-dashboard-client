import { Component, inject, OnInit } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { OffersComponent } from '../offers/offers.component';
import { ReviewSectionComponent } from '../review-section/review-section.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { MenuComponent } from "../../menu/menu.component";
import { ServicesComponent } from "../../services/services.component";
import { ActivatedRoute } from '@angular/router';

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
