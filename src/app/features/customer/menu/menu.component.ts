import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OffersCrmComponent } from '../../admin/admin-crm/menu-crm/createAddedMenu/offers-crm.component';
import { MenuService } from '../../../services/menu.service';
import { Menu } from '../../../models/menu';
import { EditOffersComponent } from '../../admin/admin-crm/menu-crm/patchMenu/edit-offers.component';
import { DeleteOffersComponent } from '../../admin/admin-crm/menu-crm/delete-offers/delete-offers.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule, OffersCrmComponent, EditOffersComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit{
  private readonly menuService = inject(MenuService);
  private readonly dialog = inject(MatDialog);
  ngOnInit(): void {
    this.getMenus();
  }
  
  additionalContent!: { image_url: string; name: string; description: string; };
  public menu : Menu[] = [];

  getMenus() {
    this.menuService.getMenu().subscribe((data: any) => {
      this.menu = data;
    });
  }

  deleteDish(menuID: string) {
    const matdialogRef = this.dialog.open(DeleteOffersComponent);

    matdialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menuService.deleteMenu(menuID).subscribe(() => {
          console.log('Menu deleted successfully', menuID);
          this.getMenus(); // Refresh the menu list
        });
      }
    });
  }
}
