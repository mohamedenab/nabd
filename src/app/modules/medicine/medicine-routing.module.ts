import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MedicineManagementComponent} from "./medicine-mangement/medicine-management.component";
import {PatientsManagementComponent} from "../patients/patients-management/patients-management.component";
import {medicineResolver} from "../../core/resolver/medicine.resolver";
import {ReportComponent} from "./report/report.component";
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'management'},
    {path: 'management', component: MedicineManagementComponent},
    {path: 'report', component: ReportComponent},
    {path: 'statistics', loadComponent: () => import('./statistics/statistics.component').then(m => m.StatisticsComponent) },
    {path: ':id/patients', component: PatientsManagementComponent, resolve: {name: medicineResolver}}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MedicineRoutingModule {
}
