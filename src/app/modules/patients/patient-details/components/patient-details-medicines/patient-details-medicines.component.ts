import {Component, inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {patientMedicine} from "../../../../../core/interfaces/patient";
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

const moment = _moment;

@Component({
  selector: 'app-patient-details-medicines',
  templateUrl: './patient-details-medicines.component.html',
  styleUrls: ['./patient-details-medicines.component.scss'],

})
export class PatientDetailsMedicinesComponent implements OnInit {
  @Input() medicine: patientMedicine[] = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['medicine', 'notes', 'dose', 'repeat', 'action'];
  isLoading = false;
  fb: FormBuilder = inject(FormBuilder);
  addMedicine: FormGroup;
  @Input() specializations: Specialization[];
  private patientService: PatientService = inject(PatientService);
  private medicineService: MedicineService = inject(MedicineService);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  dialog: MatDialog = inject(MatDialog);
  @ViewChild('addMedicineTemp') addMedicineTemp!: TemplateRef<any>;
  filteredOptions: Observable<any>;


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
  }

  openAddMedicine() {
    this.dialog.open(this.addMedicineTemp)
  }

  submitAddMedicine() {
    let formData = this.addMedicine.value;
    const medicineId = formData.medicineId.id;
    delete formData['medicineId'];
    this.patientService.addMedicine(this.route.snapshot.paramMap.get('id')!, '1', formData).subscribe((res) => {
      this.patientService.getMedicine(this.route.snapshot.paramMap.get('id')!).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.addMedicine.reset();
        this.addMedicine.get('numberBox')?.setValue(0)
        this.addMedicine.get('numberPastille')?.setValue(0)
      })
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
}
