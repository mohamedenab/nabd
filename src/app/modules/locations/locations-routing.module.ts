import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LocationsManagementComponent} from "./locations-mangement/locations-management.component";
import {LocationComponent} from "./locations/location.component";
import {locationsResolver} from "../../core/resolver/locations.resolver";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'management'},
  {path: 'management', component: LocationsManagementComponent},
  {path: ':id', component: LocationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {
}
