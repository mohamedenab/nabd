import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersManagementComponent} from "./pages/users-management/users-management.component";
import {CreateUserComponent} from "./pages/create-user/create-user.component";
import {locationsResolver} from "../../core/resolver/locations.resolver";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'management'},
  {path: 'management', component: UsersManagementComponent},
  {path: 'create', component: CreateUserComponent, resolve: {locations: locationsResolver}},
  {path: 'edit/:id', component: CreateUserComponent, resolve: {locations: locationsResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
