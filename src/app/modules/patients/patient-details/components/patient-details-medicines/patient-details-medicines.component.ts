import {Component, inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PatientMedicine} from "../../../../../core/interfaces/patient";
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Specialization} from "../../../../../core/interfaces/specialization";
import {PatientService} from "../../../../../core/services/patient.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {MatDatepicker} from "@angular/material/datepicker";
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';
import {debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap} from "rxjs";
import {MedicineService} from "../../../../../core/services/medicine.service";
import {HotToastService} from "@ngneat/hot-toast";
import {formatDate} from "@angular/common";
import {DeleteWarningComponent} from "../../../../../shared/components/delete-warning/delete-warning.component";

const moment = _moment;

@Component({
  selector: 'app-patient-details-medicines',
  templateUrl: './patient-details-medicines.component.html',
  styleUrls: ['./patient-details-medicines.component.scss'],

})
export class PatientDetailsMedicinesComponent implements OnInit {
  @Input() medicine: PatientMedicine[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['medicine', 'notes', 'dose', 'specialization', 'repeat', 'action'];
  isLoading = false;
  fb: FormBuilder = inject(FormBuilder);
  addMedicine: FormGroup;
  @Input() specializations: Specialization[];
  private patientService: PatientService = inject(PatientService);
  private medicineService: MedicineService = inject(MedicineService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  dialog: MatDialog = inject(MatDialog);
  @ViewChild('addMedicineTemp') addMedicineTemp!: TemplateRef<any>;
  @ViewChild('deleteSpecializationTemp') deleteSpecializationTemp!: TemplateRef<any>;
  filteredOptions: Observable<any>;
  editId: string = '';
  showAll = false;
  specializationDelete = '';

  constructor(private toast: HotToastService) {
    this.addMedicine = this.fb.group({
      medicineId: ['', [Validators.required]],
      numberBox: [0, [Validators.required]],
      numberPastille: [0, [Validators.required]],
      repetition: ['', [Validators.required]],
      startIn: [moment(), [Validators.required]],
      specialization: ['', [Validators.required]],
      notes: [''],
    })
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.medicine);
    this.filteredOptions = this.addMedicine.get('medicineId')!.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )
  }


  filter(val: string): Observable<any> {
    return this.medicineService.getMedicines(0, 20, val.toLowerCase())
      .pipe(
        map((response: any) => {
          return response.data
        })
      )

  }

  deleteMedicine(id: number) {
    let dialogRef = this.dialog.open(DeleteWarningComponent, {
      disableClose: true,
      data: {message: `هل انت متاكد انك تريد حذف هذا الدواء؟`}
    })
    dialogRef.afterClosed().subscribe((res) => {
      this.patientService.deleteMedicine(id.toString()).subscribe((res) => {
        this.getMedicine();
        this.toast.success('تم حذف الدواء', {duration: 5000, position: "top-right", theme: "snackbar"});

      })
    })
  }

  openEditMedicine(medicine: PatientMedicine) {
    this.editId = medicine.id.toString()
    this.addMedicine.patchValue(medicine);
    this.addMedicine.get('medicineId')?.disable();
    this.addMedicine.get('medicineId')?.setValue(medicine.medicineName);
    this.addMedicine.get('startIn')?.setValue(moment(new Date(medicine.startIn)));
    console.log(this.addMedicine.getRawValue());
    const dialogRef = this.dialog.open(this.addMedicineTemp, {disableClose: false})
    dialogRef.afterClosed().subscribe((res) => {
      this.addMedicine.reset()
      this.addMedicine.get('medicineId')?.enable();

    })
  }

  editMedicine() {
    this.patientService.editMedicine(this.editId, this.addMedicine.value).subscribe((res) => {
      this.dialog.closeAll()
      this.toast.success('تم تعديل الدواء بنجاح')
      this.getMedicine();
    })
  }

  openAddMedicine() {
    const dialogRef = this.dialog.open(this.addMedicineTemp, {disableClose: false})
    dialogRef.afterClosed().subscribe((res) => {
      this.addMedicine.reset()
    })
  }

  submitAddMedicine() {
    let formData = this.addMedicine.value;
    const medicineId = formData.medicineId.id;
    delete formData['medicineId'];
    this.patientService.addMedicine(this.route.snapshot.paramMap.get('id')!, medicineId, formData).subscribe((res) => {
      this.patientService.getMedicine(this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.addMedicine.reset();
        this.addMedicine.get('numberBox')?.setValue(0)
        this.addMedicine.get('numberPastille')?.setValue(0)
      })
    })
  }

  showAllMedicine() {
    this.patientService.getAllMedicine(this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.showAll = true
    })
  }

  getMedicine() {
    this.patientService.getMedicine(this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.showAll = false
    })
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.addMedicine.get('startIn')?.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.addMedicine.get('startIn')!.setValue(ctrlValue);
    console.log(this.addMedicine.get('startIn')?.value.year());
    console.log(this.addMedicine.get('startIn')?.value.month());
    datepicker.close();
  }

  openDeleteMedicineSpecialization(){
    this.dialog.open(this.deleteSpecializationTemp)
  }
  deleteMedicineSpecialization() {
    this.patientService.deleteSpecialization(this.specializationDelete, this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.getMedicine();
    })
  }
}
