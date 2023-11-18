import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatientsRoutingModule} from './patients-routing.module';
import {CreatePatientComponent} from './create-patient/create-patient.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {PatientDetailsComponent} from './patient-details/patient-details.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {
  PatientDetailsHeaderComponent
} from './patient-details/components/patient-details-header/patient-details-header.component';
import {
  PatientDetailsHistoryComponent
} from './patient-details/components/patient-details-history/patient-details-history.component';
import {
  PatientDetailsMedicinesComponent
} from './patient-details/components/patient-details-medicines/patient-details-medicines.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MedicinesSearchComponent} from "../../shared/components/medicines-search/medicines-search.component";
import {PatientsManagementComponent} from "./regions/patients-management.component";
// import {CalendarModule} from "primeng/calendar";

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    CreatePatientComponent,
    PatientDetailsComponent,
    PatientDetailsHeaderComponent,
    PatientDetailsHistoryComponent,
    PatientDetailsMedicinesComponent,
    PatientsManagementComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule, CKEditorModule, MatDialogModule, MatDatepickerModule,
    FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatChipsModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatProgressBarModule, MatTableModule, MatAutocompleteModule, MedicinesSearchComponent,
  ],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PatientsModule {
}
