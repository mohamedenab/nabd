import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../../core/services/patient.service";
import {Patient, PatientMedicine} from "../../../core/interfaces/patient";
import {Specialization} from "../../../core/interfaces/specialization";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient;
  medicine: PatientMedicine[] = []
  history: any;
  historyDates: any;
  specializations: Specialization[];
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  public readonly router: Router = inject(Router);
  private patientService: PatientService = inject(PatientService)

  ngOnInit() {
    this.route.data.subscribe((res: any) => {
      this.patient = res.patient;
      this.medicine = res.medicine;
      this.history = res.history;
      this.historyDates = res.historyDates;
      const date = new Date();
      if (!this.historyDates.month.includes((date.getMonth() + 1))) {
        this.historyDates.month.push(date.getMonth()+1)
      }
      if (!this.historyDates.year.includes(date.getFullYear())) {
        this.historyDates.year.push(date.getFullYear())
      }
      this.historyDates.year = this.historyDates.year.map(String)
      this.historyDates.month = this.historyDates.month.map(String)
      this.specializations = res.specialization;
    })
  }
}
