import {Component, Input} from '@angular/core';
import {Patient} from 'src/app/core/interfaces/patient';
import {Specialization} from "../../../../../core/interfaces/specialization";

@Component({
  selector: 'app-patient-details-header',
  templateUrl: './patient-details-header.component.html',
  styleUrls: ['./patient-details-header.component.scss']
})
export class PatientDetailsHeaderComponent {
  @Input() patient: Patient;
  @Input() specializations: Specialization[];
  insuranceTypes = [
    {type: 'NONE', text: 'لايوجد'},
    {type: 'STATE_INSURANCE', text: 'تامين دولة'},
    {type: 'STATE_EXPENSE', text: 'نفقة دولة'},
  ]
  expand = false;

}
