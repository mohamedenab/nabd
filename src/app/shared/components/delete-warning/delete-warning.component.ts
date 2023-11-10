import {Component, Inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {A11yModule} from "@angular/cdk/a11y";

@Component({
  selector: 'app-delete-warning',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./delete-warning.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, A11yModule]
})
export class DeleteWarningComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },
              public dialogRef: MatDialogRef<DeleteWarningComponent>,
  ) {
  }

  dismiss(dismiss: boolean) {
    this.dialogRef.close({dismiss: dismiss});

  }
}
