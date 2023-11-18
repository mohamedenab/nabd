import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegionsManagementComponent} from "./regions-mangement/regions-management.component";
import {PatientsManagementComponent} from "../patients/regions/patients-management.component";
import {locationsResolver} from "../../core/resolver/locations.resolver";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'management'},
  {path: 'management', component: RegionsManagementComponent},
  {path: ':id', component: PatientsManagementComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule {
}
