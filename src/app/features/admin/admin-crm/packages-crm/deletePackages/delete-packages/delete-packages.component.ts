import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-packages',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: ` <div
      class="flex justify-center items-center my-[clamp(1rem,3vw,1.5rem)]"
    >
      <div
        class="bg-red-100 rounded-full p-[clamp(0.75rem,2.5vw,1.5rem)] shadow-lg"
      >
        <span
          class="material-icons-outlined text-red-600 text-[clamp(2rem,6vw,4rem)]"
        >
          report_problem
        </span>
      </div>
    </div>

    <h2
      mat-dialog-title
      class="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-center text-gray-900 mb-[clamp(0.5rem,2vw,1rem)]"
    >
      Confirm Deletion
    </h2>

    <mat-dialog-content
      class="py-[clamp(0.75rem,2.5vw,1.5rem)] px-[clamp(1rem,3vw,2rem)] text-center text-gray-600 text-[clamp(0.875rem,2vw,1rem)]"
    >
      {{ data.message }}
    </mat-dialog-content>

    <mat-dialog-actions
      class="flex justify-center space-x-[clamp(0.75rem,2vw,1rem)] px-[clamp(1rem,3vw,2rem)] py-[clamp(0.5rem,2vw,1rem)]"
    >
      <button
        mat-button
        class="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1.5vw,0.75rem)] text-[clamp(0.875rem,1.5vw,1rem)] shadow-sm transition duration-300 ease-in-out"
        (click)="onCancel()"
      >
        Cancel
      </button>
      <button
        mat-button
        class="bg-red-600 hover:bg-red-700 text-white rounded-md px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1.5vw,0.75rem)] text-[clamp(0.875rem,1.5vw,1rem)] shadow-lg transition duration-300 ease-in-out"
        (click)="onConfirmDelete()"
      >
        Delete
      </button>
    </mat-dialog-actions>`,
  styleUrl: './delete-packages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePackagesComponent {
  public matdialogRef = inject(MatDialogRef<DeletePackagesComponent>);

  constructor(
    public dialogRef: MatDialogRef<DeletePackagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirmDelete() {
    this.matdialogRef.close(true);
  }

  onCancel() {
    this.matdialogRef.close();
  }
}
