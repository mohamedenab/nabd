import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoaderService} from "../../../core/services/loader.service";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit {

  public isLoading = false;

  constructor(
    private loaderService: LoaderService) { }

  public ngAfterViewInit() {
    this.loaderService.getLoader().subscribe((status: any) => {
      setTimeout(() => {
        this.isLoading = (status) ? true : false;
      });
    });
  }

}
