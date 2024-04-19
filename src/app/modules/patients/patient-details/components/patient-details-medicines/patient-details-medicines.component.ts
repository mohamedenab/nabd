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
import {patientMedicine} from "../../../../../core/interfaces/patient-medicine";
import {SpecializationsService} from "../../../../../core/services/specializations.service";

const moment = _moment;

@Component({
  selector: 'app-patient-details-medicines',
  templateUrl: './patient-details-medicines.component.html',
  styleUrls: ['./patient-details-medicines.component.scss'],

})
export class PatientDetailsMedicinesComponent implements OnInit {
  @Input() medicine: PatientMedicine[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['medicine', 'notes', 'dose', 'specialization', 'active', 'repeat', 'action'];
  isLoading = false;
  private fb: FormBuilder = inject(FormBuilder);
  addMedicine: FormGroup;
  @Input() specializations: Specialization[];
  private patientService: PatientService = inject(PatientService);
  private medicineService: MedicineService = inject(MedicineService);
  private specializationsService: SpecializationsService = inject(SpecializationsService);
  private toast: HotToastService = inject(HotToastService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  dialog: MatDialog = inject(MatDialog);
  @ViewChild('addMedicineTemp') addMedicineTemp!: TemplateRef<any>;
  @ViewChild('deleteSpecializationTemp') actionSpecializationTemp!: TemplateRef<any>;
  filteredOptions: Observable<any>;
  editId: string = '';
  showAll = false;
  specializationSelected = '';
  isToggleDialog = false;

  constructor() {
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
    this.addMedicine.get('notes')?.setValue(medicine.note);
    this.addMedicine.get('specialization')?.setValue(medicine.specializationId);
    this.addMedicine.get('startIn')?.setValue(moment(new Date(medicine.startIn)));
    console.log(this.addMedicine.getRawValue());
    const dialogRef = this.dialog.open(this.addMedicineTemp, {disableClose: false})
    dialogRef.afterClosed().subscribe((res) => {
      this.addMedicine.reset()
      this.addMedicine.get('medicineId')?.enable();

    })
  }

  editMedicine() {
    let formData = this.addMedicine.value;
    formData['year'] = new Date(formData['startIn']).getFullYear()
    formData['month'] = new Date(formData['startIn']).getMonth() + 1
    delete formData['startIn'];
    this.patientService.editMedicine(this.editId, this.addMedicine.value).subscribe((res) => {
      this.dialog.closeAll()
      this.toast.success('تم تعديل الدواء بنجاح')
      this.getMedicine();
    })
  }

  openAddMedicine() {
    const dialogRef = this.dialog.open(this.addMedicineTemp, {disableClose: false})
    dialogRef.afterClosed().subscribe((res) => {
      this.resetAddMedicine()
    })
  }

  resetAddMedicine() {
    this.addMedicine.reset()
    this.addMedicine.get('numberBox')?.setValue(0)
    this.addMedicine.get('startIn')?.setValue(moment())
    this.addMedicine.get('numberPastille')?.setValue(0)
  }

  submitAddMedicine() {
    let formData = this.addMedicine.value;
    const medicineId = formData.medicineId.id;
    delete formData['medicineId'];
    formData['year'] = new Date(formData['startIn']).getFullYear()
    formData['month'] = new Date(formData['startIn']).getMonth() + 1
    delete formData['startIn'];
    this.patientService.addMedicine(this.route.snapshot.paramMap.get('id')!, medicineId, formData).subscribe((res) => {
      this.patientService.getMedicine(this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.resetAddMedicine()
      })
    })
  }

  showAllMedicine() {
    this.patientService.getAllMedicine(this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.displayedColumns.splice(this.displayedColumns.length - 1, 0, 'arrayOfMonths');
      this.showAll = true
    })
  }

  getMedicine() {
    this.patientService.getMedicine(this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.displayedColumns.splice(this.displayedColumns.length - 2, 1);
      this.showAll = false
    })
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.addMedicine.get('startIn')?.value;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.addMedicine.get('startIn')!.setValue(ctrlValue);
    datepicker.close();
  }

  openActionMedicineSpecialization(isToggleDialogFlag: boolean) {
    this.isToggleDialog = isToggleDialogFlag;
    this.dialog.open(this.actionSpecializationTemp)
  }


  deleteMedicineSpecialization() {
    this.patientService.deleteSpecialization(this.specializationSelected, this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.getMedicine();
      this.dialog.closeAll()
    })
  }

  toggleMedicine(medicine: patientMedicine) {
    if (medicine.active) {
      this.medicineService.deactivateMedicine(medicine.medicineId, this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
        this.toast.success('تم تعطيل الدواء بنجاح')
      })
    } else {
      this.medicineService.activateMedicine(medicine.medicineId, this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
        this.toast.success('تم تفعيل الدواء بنجاح')
      })
    }
  }

  getMedicines() {
    this.patientService.getMedicine(this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
    })
  }

  activeMedicineSpecialization() {
    this.specializationsService.activateMedicineSpecializations(this.specializationSelected, this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.dialog.closeAll()
      this.getMedicines();
    })
  }

  deactiveMedicineSpecialization() {
    this.specializationsService.deactivateMedicineSpecializations(this.specializationSelected, this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
      this.dialog.closeAll()
      this.getMedicines();
    })
  }
}
