import {AfterViewInit, Component, inject, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {MedicineService} from "../../../core/services/medicine.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {HotToastService} from "@ngneat/hot-toast";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {catchError, map, of, startWith, switchMap} from "rxjs";
import {Medicine} from "../../../core/interfaces/medicine";
import {DeleteWarningComponent} from "../../../shared/components/delete-warning/delete-warning.component";
import {ReportService} from "../../../core/services/report.service";
import {ExcelService} from "../../../core/services/excel.service";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent implements AfterViewInit {
  authService: AuthService = inject(AuthService);
  reportService: ReportService = inject(ReportService);
  displayedColumns: string[] = ['name', 'number', 'price', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = 10;
  isLoading = true;
  replacedId: string = ''
  editMedicineObj: any = {}
  replaceForm: FormGroup;
  editAmountForm: FormGroup;
  @ViewChild('replaceTemp') replaceTemp!: TemplateRef<any>;
  @ViewChild('editTemp') editTemp!: TemplateRef<any>;
  dialog: MatDialog = inject(MatDialog);
  private toast: HotToastService = inject(HotToastService);

  constructor(private fb: FormBuilder, private excelService: ExcelService) {
    if (this.authService.isUserAdmin()) {
      this.displayedColumns.pop()
    }
    this.replaceForm = this.fb.group({
      firstId: [{value: '', disabled: true}],
      secondId: '',
    })
    this.editAmountForm = this.fb.group({
      numberBox: ['', [Validators.required]],
      numberPastille: ['', [Validators.required]]
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
          return this.reportService.getReport(
            this.paginator.pageIndex,
            this.paginator.pageSize
          ).pipe(catchError(() => of(null)));
        }),
        map((data: any) => {
          if (data == null) return [];
          this.totalElements = data.totalElements;
          this.isLoading = false;
          return data.data.reportMedicineDto;
        })
      )
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }


  generateReport() {
    this.reportService.generateReport().subscribe((res) => {
      this.toast.success('تم انشاء تقرير جديد', {duration: 5000, position: "top-right", theme: "snackbar"});
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
      this.reportService.deleteMedicine(medicine.id.toString()).subscribe((res) => {
          this.toast.success('تم حذف الدواء', {duration: 5000, position: "top-right", theme: "snackbar"});
          this.reportService.getReport(
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
    // this.medicineService.getMedicines(
    //     0,
    //     this.paginator.pageSize,
    //     filterValue
    // ).subscribe((res: any) => {
    //     this.dataSource = new MatTableDataSource(res.data);
    //     this.totalElements = res.totalElements;
    //     this.isLoading = false;
    // })
  }


  openReplaceMedicine(medicine: any) {
    const dialogTemp = this.dialog.open(this.replaceTemp)
    this.replacedId = medicine.id;
    this.replaceForm.get('firstId')?.setValue(medicine.medicine)
    dialogTemp.afterClosed().subscribe((res) => {
      this.replaceForm.reset()
      this.toast.success('تم استبدال الدواء', {duration: 5000, position: "top-right", theme: "snackbar"});
    })
  }

  replaceMedicine() {
    this.reportService.replaceMedicine(this.replacedId, this.replaceForm.get('secondId')?.value!).subscribe((res) => {
      this.reportService.getReport(
        0,
        this.paginator.pageSize
      ).subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data.reportMedicineDto);
        this.totalElements = res.totalElements;
        this.isLoading = false;
        this.dialog.closeAll();
        this.replacedId = '';
      })
    })
  }

  openEditMedicine(medicine: any) {
    const dialogTemp = this.dialog.open(this.editTemp)
    this.editMedicineObj = medicine;
    this.replaceForm.get('firstId')?.setValue(medicine.nameInEng)
    dialogTemp.afterClosed().subscribe((res) => {
      this.editAmountForm.reset()
    })
  }

  editMedicine() {
    this.reportService.editReport(this.editMedicineObj.medicineId, this.editAmountForm.value).subscribe((res) => {
      this.reportService.getReport(
        0,
        this.paginator.pageSize
      ).subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.data.reportMedicineDto);
        this.totalElements = res.totalElements;
        this.isLoading = false;
        this.editAmountForm.reset()
        this.dialog.closeAll();
        this.toast.success('تم تعديل الدواء', {duration: 5000, position: "top-right", theme: "snackbar"});
      })
    })
  }

  removeKeys(obj: any, keysToRemove: any[]) {
    for (let key of keysToRemove) {
      delete obj[key];
    }
    return obj;
  }

  downloadExcel(): void {
    this.reportService.getReport(
      this.paginator.pageIndex,
      100000000
    ).subscribe((res: any) => {
      const keysToRemove = ['id', 'medicineId'];
      const data = res.data.reportMedicineDto.map((obj: any) => this.removeKeys({...obj}, keysToRemove));
      this.excelService.exportToExcel(data, 'التقرير', 'Sheet1');
      this.toast.success('تم تحميل التقرير', {duration: 5000, position: "top-right", theme: "snackbar"});

    })
  }
}
