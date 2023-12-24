import {AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DeleteWarningComponent} from "../../../shared/components/delete-warning/delete-warning.component";
import {ActivatedRoute} from "@angular/router";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {LocationService} from "../../../core/services/location.service";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-Locations-management-management',
  templateUrl: './locations-management.component.html',
  styleUrls: ['./locations-management.component.scss'],
})
export class LocationsManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['region', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  regionName = ''
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('addRegionTemp') addRegionTemp!: TemplateRef<any>;
  totalElements = 10;
  data: any;
  isLoading = true;

  constructor(private dialog: MatDialog, private locationService: LocationService, public authService: AuthService) {
  }

  ngOnInit() {


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.totalElements = this.data.totalElements;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.locationService.getLocations(
            this.paginator.pageIndex,
            this.paginator.pageSize
          ).pipe(catchError(() => of(null)));
        }),
        map((data: any) => {
          if (data == null) return [];
          this.totalElements = data.totalElements;
          this.isLoading = false;
          return data.data;
        })
      )
      .subscribe((data: any) => {
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
      });
  }

  getRegion(event: any) {
    this.locationService.getLocations(event.pageIndex, event.pageSize).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource<any>(res.data);
      this.totalElements = res.totalElements;

    })
  }

  openRegion() {
    this.dialog.open(this.addRegionTemp)
  }

  addRegion() {
    this.locationService.createLocation({"locationName": this.regionName}).subscribe((res) => {
      this.dialog.closeAll();
      this.getRegion({
        pageIndex: this.paginator.pageIndex,
        pageSize: this.paginator.pageSize,
      })
    })
  }

  deleteRegion() {
    let dialogRef = this.dialog.open(DeleteWarningComponent, {
      disableClose: true,
      data: {message: 'هل انت متاكد انك تريد حذف المنطقة 1 ؟'}
    })
    dialogRef.afterClosed().subscribe((res) => {

    })
  }
}
