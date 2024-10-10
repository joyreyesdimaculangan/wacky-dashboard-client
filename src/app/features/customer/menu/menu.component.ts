import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OffersCrmComponent } from '../../admin/offers-crm/offers-crm.component';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../../models/menu';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule, OffersCrmComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit{
  private readonly menuService = inject(MenuService);
  ngOnInit(): void {
    this.menuService.getMenu().subscribe((data: any) => {
      this.menu = data;
    });
  }
  
  isAddContentModalOpen: boolean = false;
  additionalContent!: { image_url: string; name: string; description: string; };
  public menu : Menu[] = [];

  openAddContent(menu: any) {
    this.isAddContentModalOpen = true;
  }

  closeAddContent() {
    this.isAddContentModalOpen = false;
  }
}
