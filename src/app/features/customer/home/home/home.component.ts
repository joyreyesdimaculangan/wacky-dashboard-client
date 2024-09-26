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
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.activeRoute.fragment.subscribe((fragment) => {
      this.jumpToSection(fragment);
    });
  }

  jumpToSection(fragment: any) {
    if (fragment) {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
