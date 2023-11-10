import {ResolveFn} from '@angular/router';
import {PatientService} from "../services/patient.service";
import {inject} from "@angular/core";
import {Observable} from "rxjs";

export const patientResolver: ResolveFn<Observable<any>> = (route, state, patientService: PatientService = inject(PatientService)) => {
  return patientService.getPatient(route.paramMap.get('id')!);
};

export const patientMedicineResolver: ResolveFn<Observable<any>> = (route, state, patientService: PatientService = inject(PatientService)) => {
  return patientService.getMedicine(route.paramMap.get('id')!);
};
export const patientHistoryResolver: ResolveFn<Observable<any>> = (route, state, patientService: PatientService = inject(PatientService)) => {
  const date = new Date()
  return patientService.getHistory(route.paramMap.get('id')!, date.getMonth() + 1, date.getFullYear());
};
