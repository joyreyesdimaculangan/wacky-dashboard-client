import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="unauthorized-container">
    <h1>Unauthorized</h1>
    <p>You do not have permission to access this page.</p>
  </div>`,
  styles: [
    `
      .unauthorized-container {
        text-align: center;
        margin-top: 50px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppUnauthorizedComponent {}
