import { Component, inject, OnInit } from '@angular/core';
import { OffersComponent } from '../customer/offers-carousel/offers.component';
import { MenuComponent } from '../customer/menu/menu.component';
import { ServicesComponent } from '../customer/wackys-services/services.component';
import { ReviewSectionComponent } from '../customer/review-section/review-section.component';
import { InquiryFormComponent } from '../customer/contactUs/inquiry-form.component';
import { HeaderComponent } from '../customer/header/header.component';
import { FooterComponent } from '../customer/footer/footer.component';

import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerService } from '../loadingFunction/loadingSpinner.service';
import { CommonModule } from '@angular/common';
import { LoadingFunctionComponent } from "../loadingFunction/loadingFunction.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    OffersComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ServicesComponent,
    InquiryFormComponent,
    HeaderComponent,
    LoadingFunctionComponent,
    ReviewSectionComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private loadingService = inject(LoadingSpinnerService);
  loading$ = this.loadingService.loading$;

   ngOnInit() {
    this.loadingService.show();

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });

    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });

    setTimeout(() => {
      this.loadingService.hide();
    }, 2000); 
  }

  private scrollToFragment(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
