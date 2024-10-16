import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule } from './print-routing.module';
import {PrintComponent} from "./print.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    PrintComponent
  ],
  imports: [
    CommonModule,
    PrintRoutingModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTableModule
  ]
})
export class PrintModule { }
