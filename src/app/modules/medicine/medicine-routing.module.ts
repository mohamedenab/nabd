import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedicineManagementComponent} from "./medicine-mangement/medicine-management.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'management'},
  {path: 'management', component: MedicineManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicineRoutingModule {
}
