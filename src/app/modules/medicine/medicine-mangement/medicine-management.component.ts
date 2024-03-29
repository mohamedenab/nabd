import {AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {MedicineService} from "../../../core/services/medicine.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DeleteWarningComponent} from "../../../shared/components/delete-warning/delete-warning.component";
import {HotToastService} from "@ngneat/hot-toast";
import {Medicine} from "../../../core/interfaces/medicine";

@Component({
  selector: 'app-medicine-management',
  templateUrl: './medicine-management.component.html',
})
export class MedicineManagementComponent implements AfterViewInit {
  authService: AuthService = inject(AuthService);
  medicineService: MedicineService = inject(MedicineService);
  displayedColumns: string[] = ['name', 'number', 'price', 'usage', 'noPatient', 'status', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = 10;
  isLoading = true;
  replacedId: string = ''
  replaceForm: FormGroup;
  addForm: FormGroup;
  @ViewChild('replaceTemp')
  replaceTemp!: TemplateRef<any>;
  @ViewChild('addTemp')
  addTemp!: TemplateRef<any>;
  dialog: MatDialog = inject(MatDialog);
  search = ''
  private toast: HotToastService = inject(HotToastService);

  constructor(private fb: FormBuilder) {
    if (this.authService.isUserAdmin()) {
      this.displayedColumns.pop()
    }
    this.replaceForm = this.fb.group({
      firstId: [{value: '', disabled: true}],
      secondId: '',
    })
    this.addForm = this.fb.group({
      nameInEng: ['',[Validators.required]],
      nameInArb: ['',[Validators.required]],
      price: ['',[Validators.required]],
      numberOfPastilleInEachBox: ['',[Validators.required]],
      activeSubstance: ['',[Validators.required]],
    })
  }

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
            this.paginator.pageSize,
            this.search
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

  deleteMedicine(medicine: Medicine) {
    let dialogRef = this.dialog.open(DeleteWarningComponent, {
      disableClose: true,
      data: {
        message: `هل انت متاكد انك تريد حذف الدواء ${medicine.nameInEng} ؟ `
      }
    })
    dialogRef.afterClosed().subscribe((res) => {
      this.medicineService.deleteMedicine(medicine.id.toString()).subscribe((res) => {
        this.toast.success('تم حذف الدواء', {duration: 5000, position: "top-right", theme: "snackbar"});
        this.medicineService.getMedicines(
          0,
          this.paginator.pageSize
        ).subscribe((res: any) => {
          this.dataSource = new MatTableDataSource(res.data);
          this.totalElements = res.totalElements;
          this.isLoading = false;
        })
      })
    })
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
        this.medicineService.getMedicines(
          0,
          this.paginator.pageSize
        ).subscribe((res: any) => {
          this.dataSource = new MatTableDataSource(res.data);
          this.totalElements = res.totalElements;
          this.isLoading = false;
        })
      })
    }
  }

  openReplaceMedicine(medicine: any) {
    const dialogTemp = this.dialog.open(this.replaceTemp)
    this.replacedId = medicine.id;
    this.replaceForm.get('firstId')?.setValue(medicine.nameInEng)
    dialogTemp.afterClosed().subscribe((res) => {
      this.replaceForm.reset()
    })
  }

  replaceMedicine() {
    this.medicineService.replaceMedicine(this.replacedId, this.replaceForm.get('secondId')?.value!).subscribe((res) => {
      this.medicineService.getMedicines(
        0,
        this.paginator.pageSize
      ).subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.totalElements = res.totalElements;
        this.isLoading = false;
        this.dialog.closeAll();
        this.replacedId = '';
      })
    })
  }

  openAddMedicine() {
    const dialogTemp = this.dialog.open(this.addTemp)
    dialogTemp.afterClosed().subscribe((res) => {
      this.addForm.reset()
    })
  }
  addMedicine() {
    this.medicineService.addMedicine(this.addForm.value).subscribe((res)=>{
      this.toast.success('تم اضاقة الدواء', {duration: 5000, position: "top-right", theme: "snackbar"});

    })
  }
}
