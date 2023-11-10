import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";
import {noAuthGuard} from "./core/guards/no-auth.guard";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},

  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(
        m => m.AuthModule
      ),
    canActivate:[noAuthGuard]

  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then(
        m => m.HomeModule
      ),
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
