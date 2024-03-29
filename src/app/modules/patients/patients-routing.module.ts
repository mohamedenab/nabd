import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreatePatientComponent} from "./create-patient/create-patient.component";
import {PatientDetailsComponent} from "./patient-details/patient-details.component";
import {locationsResolver} from "../../core/resolver/locations.resolver";
import {specializationsResolver} from "../../core/resolver/specializations.resolver";
import {
  patientHistoryDatesResolver,
  patientHistoryResolver,
  patientMedicineResolver,
  patientResolver
} from "../../core/resolver/patient.resolver";

const routes: Routes = [
  {
    path: 'create/:locationId',
    component: CreatePatientComponent,
    resolve: {locations: locationsResolver, specialization: specializationsResolver}
  },
  {
    path: ':id', resolve: {
      patient: patientResolver,
    }, children: [
      {
        path: 'edit',
        component: CreatePatientComponent,
        resolve: {locations: locationsResolver, specialization: specializationsResolver}
      },
      {
        path: 'details', component: PatientDetailsComponent, resolve: {
          medicine: patientMedicineResolver,
          history: patientHistoryResolver, specialization: specializationsResolver,
          historyDates: patientHistoryDatesResolver
        }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {
}
