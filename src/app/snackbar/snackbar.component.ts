import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="snackbar-content">
      <mat-icon>{{ data.icon }}</mat-icon>
      <span>{{ data.message }}</span>
    </div>
  `,
  styles: [
    `
      .snackbar-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
      }
      
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
