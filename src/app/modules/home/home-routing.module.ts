import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {roleGuard} from "../../core/guards/role.guard";

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'locations'},
      {path: 'locations', loadChildren: () => import('../locations/locations.module').then(m => m.LocationsModule)},
      {path: 'patients', loadChildren: () => import('../patients/patients.module').then(m => m.PatientsModule)},
      {path: 'print', loadChildren: () => import('../print/print.module').then(m => m.PrintModule)},
      {
        path: 'medicines',
        loadChildren: () => import('../medicine/medicine.module').then(m => m.MedicineModule),
        canActivate: [roleGuard],
        data: {role: ['ROLE_SU','ROLE_AU']},
      },
      {
        path: 'users',
        canActivate: [roleGuard],
        data: {role: ['ROLE_SU']},
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
