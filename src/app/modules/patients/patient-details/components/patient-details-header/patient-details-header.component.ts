import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-details-header',
  templateUrl: './patient-details-header.component.html',
  styleUrls: ['./patient-details-header.component.scss']
})
export class PatientDetailsHeaderComponent {
  specializations = [
    {type: 'teeth', text: 'اسنان'},
    {type: 'general_surgery', text: 'جراحة عامة'},
    {type: 'hematology', text: 'امراض الدم'},
  ];
  expand = false;

}
