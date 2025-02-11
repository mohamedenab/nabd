import {Component, Inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {A11yModule} from "@angular/cdk/a11y";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-delete-warning',
  templateUrl: './delete-warning.component.html',
  styleUrls: ['./delete-warning.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, A11yModule, FormsModule, MatFormFieldModule, MatInputModule]
})
export class DeleteWarningComponent {
  reason: string
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, incommingStatuse: boolean },
              public dialogRef: MatDialogRef<DeleteWarningComponent>,
  ) {
  }

  dismiss(dismiss: boolean) {
    this.dialogRef.close({dismiss: dismiss, reason: this.reason});

  }
}
