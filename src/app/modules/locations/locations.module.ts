import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationsRoutingModule} from './locations-routing.module';
import {LocationsManagementComponent} from './locations-mangement/locations-management.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {
  LocationPatientsManagementComponent
} from "./location-patients-management/location-patients-management.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    LocationsManagementComponent, LocationPatientsManagementComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSlideToggleModule
  ]
})
export class LocationsModule {
}
