import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {MedicineService} from "../../../core/services/medicine.service";

@Component({
  selector: 'app-medicine-management',
  templateUrl: './medicine-management.component.html',
  styleUrls: ['./medicine-management.component.scss']
})
export class MedicineManagementComponent implements AfterViewInit {
  authService: AuthService = inject(AuthService);
  medicineService: MedicineService = inject(MedicineService);
  displayedColumns: string[] = ['name', 'number', 'price', 'usage', 'noPatient', 'status', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = 10;
  isLoading = true;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.totalElements = this.data.totalElements;

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.medicineService.getMedicines(
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
        this.dataSource = new MatTableDataSource(data);
      });
  }

  deleteMedicine() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.isLoading = true;
    this.medicineService.getMedicines(
      0,
      this.paginator.pageSize,
      filterValue
    ).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.totalElements = res.totalElements;
      this.isLoading = false;
    })
  }

  upload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.medicineService.uploadFile(formData).subscribe((res) => {
        console.log(res)
      })
    }
  }
}
