import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuService } from '../../../services/menu.service';
import { Menu, MenuValues } from '../../../models/menu';
import { DeleteOffersComponent } from '../../admin/admin-crm/menu-crm/deleteMenu/delete-offers.component';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AuthService } from '../../../core/auth/services/auth.service';
import { ToastNotificationsComponent } from '../../../core/toastNotifications/toastNotifications.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    DragDropModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  private readonly menuService = inject(MenuService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  public authService = inject(AuthService);
  public selectedItems: Set<string> = new Set<string>();
  public menu: Menu[] = [];
  public menuValues: MenuValues[] = [];
  userRole: string | null = null;
  isDragging = false;
  toastNotification = inject(ToastNotificationsComponent);

  ngOnInit(): void {
    this.getMenus();
    this.userRole = this.authService.getUserRole();
  }

  getMenus() {
    this.menuService.getMenu().subscribe((data: any) => {
      this.menu = data;
    });
  }

  deleteDish(menuID: string) {
    if (this.authService.isAdmin()) {
      const matdialogRef = this.dialog.open(DeleteOffersComponent, {
        data: {
          message:
            'Are you sure you want to delete this menu? This action is irreversible and cannot be undone.',
        },
      });

      matdialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.menuService.deleteMenu(menuID).subscribe(() => {
            console.log('Menu deleted successfully', menuID);
            this.getMenus();
            this.toastNotification.showSuccess('Menu deleted successfully', 'Success');
          });
        } else
          (error: any) => {
            console.error('Error deleting selected items:', error);
            this.toastNotification.showError('Failed to delete menu', 'Error');
          };
      });
    }
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
    if (this.authService.isAdmin()) {
      const dialogRef = this.dialog.open(DeleteOffersComponent, {
        data: {
          message:
            'Are you sure you want to delete the selected items? This action is irreversible and cannot be undone.',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const deleteObservables = Array.from(this.selectedItems).map((menuID) =>
            this.menuService.deleteMenu(menuID)
          );

          forkJoin(deleteObservables).subscribe(() => {
            console.log('Selected items deleted successfully');
            this.getMenus();
            this.selectedItems.clear();
            this.toastNotification.showSuccess('Selected items deleted successfully', 'Success');
          });
        } else
          (error: any) => {
            console.error('Error deleting selected items:', error);
            this.toastNotification.showError('Failed to delete selected items', 'Error');
          };
      });
    }
  }

  deleteAllItems() {
    if (this.authService.isAdmin()) {
      const dialogRef = this.dialog.open(DeleteOffersComponent, {
        data: {
          message:
            'Are you sure you want to delete all items? This action is irreversible and cannot be undone.',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          const deleteObservables = this.menu.map((dish) =>
            this.menuService.deleteMenu(dish.menuID.toString())
          );

          forkJoin(deleteObservables).subscribe(() => {
            console.log('All items deleted successfully');
            this.getMenus();
            this.selectedItems.clear();
            this.toastNotification.showSuccess('All items deleted successfully', 'Success');
          });
        } else
          (error: any) => {
            console.error('Error deleting selected items:', error);
            this.toastNotification.showError('Failed to delete all items', 'Error');
          };
      });
    }
  }
}
