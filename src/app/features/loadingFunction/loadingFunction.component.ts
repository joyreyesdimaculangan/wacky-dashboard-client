import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-loading-function',
  standalone: true,
  imports: [NgClass],
  template: `<div [ngClass]="{ 'spinner-container': !inline, 'spinner-inline': inline }">
  <div class="spinner"></div>
</div>`,
  styleUrl: './loadingFunction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingFunctionComponent {
  @Input() inline: boolean = false;
}
