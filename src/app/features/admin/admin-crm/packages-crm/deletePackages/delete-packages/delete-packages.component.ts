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
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-packages',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIcon],
  template: ` <div class="flex justify-center items-center my-4">
      <div class="bg-red-100 rounded-full p-4 shadow-lg">
        <span class="material-icons-outlined text-red-600 text-6xl"
          >report_problem</span
        >
      </div>
    </div>

    <h2 mat-dialog-title class="text-xl font-bold text-center text-gray-900">
      Confirm Deletion
    </h2>

    <mat-dialog-content class="py-4 px-6 text-center text-gray-600">
      {{ data.message }}
    </mat-dialog-content>

    <mat-dialog-actions class="flex justify-center space-x-4 px-6 py-3">
      <button
        mat-button
        class="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md px-4 py-2 shadow-sm transition duration-300 ease-in-out"
        (click)="onCancel()"
      >
        Cancel
      </button>
      <button
        mat-button
        class="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 shadow-lg transition duration-300 ease-in-out"
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
