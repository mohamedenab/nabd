import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {RegionsModule} from "../locations/regions.module";
import {roleGuard} from "../../core/guards/role.guard";

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: 'regions', loadChildren: () => import('../locations/regions.module').then(m => m.RegionsModule)},
      {path: 'patients', loadChildren: () => import('../patients/patients.module').then(m => m.PatientsModule)},
      {
        path: 'medicines',
        loadChildren: () => import('../medicine/medicine.module').then(m => m.MedicineModule),
        canActivate: [roleGuard],
        data: {role: 'ROLE_SU'},
      },
      {
        path: 'users',
        canActivate: [roleGuard],
        data: {role: 'ROLE_SU'},
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
