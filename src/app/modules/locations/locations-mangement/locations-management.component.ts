import {AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DeleteWarningComponent} from "../../../shared/components/delete-warning/delete-warning.component";
import {ActivatedRoute} from "@angular/router";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {LocationService} from "../../../core/services/location.service";
import {AuthService} from "../../../core/services/auth.service";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-Locations-management-management',
  templateUrl: './locations-management.component.html',
  styleUrls: ['./locations-management.component.scss'],
})
export class LocationsManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['region', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  regionName = ''
  regionId = ''
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('addRegionTemp') addRegionTemp!: TemplateRef<any>;
  totalElements = 10;
  data: any;
  isLoading = true;
  private toast: HotToastService = inject(HotToastService);

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
    const dialogRef = this.dialog.open(this.addRegionTemp)
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'submit') {
        this.addRegion()
      }
    })
  }

  editRegion(region: any) {
    this.regionId = region.id
    this.regionName = region.locationName;
    const dialogRef = this.dialog.open(this.addRegionTemp)
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'submit') {
        this.locationService.editLocations(this.regionName, this.regionId).subscribe((res) => {
          this.toast.success('تم تعديل المنطقة', {duration: 5000, position: "top-right", theme: "snackbar"});
          this.getRegion({
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
          })
        })
      }
    })
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

  deleteRegion(region: any) {
    let dialogRef = this.dialog.open(DeleteWarningComponent, {
      disableClose: true,
      data: {message: `هل انت متاكد انك تريد حذف المنطقة ${region.locationName} ؟`}
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.locationService.deleteLocations(region.id).subscribe((res) => {
          this.toast.success('تم حذف المنطقة', {duration: 5000, position: "top-right", theme: "snackbar"});
          this.getRegion({
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
          })
        })
      }
    })
  }
}
