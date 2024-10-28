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
import { DeleteOffersComponent } from '../../admin/admin-crm/menu-crm/deleteMenu/delete-offers.component';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule, 
    HeaderComponent, 
    FooterComponent, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    OffersCrmComponent, 
    EditOffersComponent,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit{
  private readonly menuService = inject(MenuService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  public selectedItems: Set<string> = new Set<string>();
  public menu : Menu[] = [];

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenu().subscribe((data: any) => {
      this.menu = data;
    });
  }

  deleteDish(menuID: string) {
    const matdialogRef = this.dialog.open(DeleteOffersComponent,{
      data: { message: 'Are you sure you want to delete this menu? This action is irreversible and cannot be undone.' }
    });

    matdialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menuService.deleteMenu(menuID).subscribe(() => {
          console.log('Menu deleted successfully', menuID);
          this.getMenus(); 
          this.snackBar.open('Menu deleted successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass: ['custom-snackbar-success']
          });
        });
      } else (error: any) => {
        console.error('Error deleting selected items:', error);
        this.snackBar.open('Failed to delete selected items.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-error']
        });
      }
    });
  }

  toggleSelection(menuID: string) {
    if (this.selectedItems.has(menuID)) {
      this.selectedItems.delete(menuID);
    } else {
      this.selectedItems.add(menuID);
    }
  }

  isSelected(menuID: string): boolean {
    return this.selectedItems.has(menuID);
  }

  deleteSelectedItems() {
    const dialogRef = this.dialog.open(DeleteOffersComponent, {
      data: { message: 'Are you sure you want to delete the selected items? This action is irreversible and cannot be undone.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deleteObservables = Array.from(this.selectedItems).map(menuID =>
          this.menuService.deleteMenu(menuID)
        );

        forkJoin(deleteObservables).subscribe(() => {
          console.log('Selected items deleted successfully');
          this.getMenus(); 
          this.selectedItems.clear(); 
          this.snackBar.open('Selected items deleted successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-success']
          });
        });
      } else (error: any) => {
        console.error('Error deleting selected items:', error);
        this.snackBar.open('Failed to delete selected items.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-error']
        });
      }
    });
  }

  deleteAllItems() {
    const dialogRef = this.dialog.open(DeleteOffersComponent, {
      data: { message: 'Are you sure you want to delete all items? This action is irreversible and cannot be undone.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const deleteObservables = this.menu.map(dish =>
          this.menuService.deleteMenu(dish.menuID.toString())
        );

        forkJoin(deleteObservables).subscribe(() => {
          console.log('All items deleted successfully');
          this.getMenus(); 
          this.selectedItems.clear(); 
          this.snackBar.open('All items deleted successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar-success']
          });
        });
      } else (error: any) => {
        console.error('Error deleting selected items:', error);
        this.snackBar.open('Failed to delete selected items.', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-error']
        });
      }
    });
  }
}
