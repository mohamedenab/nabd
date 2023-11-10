import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../../core/services/patient.service";
import {patientMedicine} from "../../../core/interfaces/patient";
import {Specialization} from "../../../core/interfaces/specialization";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  patient: any;
  medicine: patientMedicine[] = []
  history: any;
  specializations: Specialization[];
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  public readonly router: Router = inject(Router);
  private patientService: PatientService = inject(PatientService)

  ngOnInit() {
    this.route.data.subscribe((res: any) => {
      this.medicine = res.medicine;
      this.history = res.history;
      this.specializations = res.specialization;
    })
  }
}
