import {Component, Input} from '@angular/core';
import {Patient} from 'src/app/core/interfaces/patient';

@Component({
  selector: 'app-patient-details-header',
  templateUrl: './patient-details-header.component.html',
  styleUrls: ['./patient-details-header.component.scss']
})
export class PatientDetailsHeaderComponent {
  @Input() patient: Patient;

  specializations = [
    {type: 'teeth', text: 'اسنان'},
    {type: 'general_surgery', text: 'جراحة عامة'},
    {type: 'hematology', text: 'امراض الدم'},
  ];
  expand = false;

}
