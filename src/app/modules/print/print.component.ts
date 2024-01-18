import {Component, inject, Input, OnInit} from '@angular/core';
import {LocationData} from "../../core/interfaces/print";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent {
  locationData: LocationData[] = [];
  displayedColumns: string[] = ['medicine', 'dose'];
  protected readonly Object = Object;
  public readonly router: Router = inject(Router);


  constructor() {
    this.locationData = this.router.getCurrentNavigation()!.extras.state!.data
    console.log(this.locationData);
  }
}
