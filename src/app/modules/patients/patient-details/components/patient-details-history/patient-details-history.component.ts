import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-patient-details-history',
  templateUrl: './patient-details-history.component.html',
  styleUrls: ['./patient-details-history.component.scss']
})
export class PatientDetailsHistoryComponent {
  @Input() history: any;
  months: number[] = [10, 11, 12];
  years: number[] = [2023];
  month = new FormControl('')
  year = new FormControl('')
}
