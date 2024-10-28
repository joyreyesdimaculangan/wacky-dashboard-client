import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-packages',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>edit-packages works!</p>`,
  styleUrl: './edit-packages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPackagesComponent { }
