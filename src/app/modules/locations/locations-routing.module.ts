import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LocationsManagementComponent} from "./locations-mangement/locations-management.component";
import {PatientsManagementComponent} from "../patients/patients-management/patients-management.component";
import {locationResolver, locationsResolver} from "../../core/resolver/locations.resolver";
import {
  LocationPatientsManagementComponent
} from "./location-patients-management/location-patients-management.component";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'management'},
    {path: 'management', component: LocationsManagementComponent},
    {path: ':id', component: LocationPatientsManagementComponent, resolve: {name: locationResolver}},

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LocationsRoutingModule {
}
