import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AbstractControl, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {debounceTime, distinctUntilChanged, filter, map, Observable, startWith, switchMap} from "rxjs";
import {MedicineService} from "../../../core/services/medicine.service";
import {patientMedicine} from "../../../core/interfaces/patient-medicine";

@Component({
  selector: 'app-medicines-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './medicines-search.component.html',
  styleUrls: ['./medicines-search.component.scss']
})
export class MedicinesSearchComponent implements OnInit {
  _control: FormControl;
  @Input({required: true})
  set control(control: AbstractControl) {
    console.log(control);
    this._control = control as FormControl;
  }

  get control(): FormControl {
    return this._control;
  }

  filteredOptions: Observable<any>;
  private medicineService: MedicineService = inject(MedicineService);

  ngOnInit() {
    this.filteredOptions = this.control!.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return val ? this.filter(val || '')! : '';
      })
    )
  }

  getOptionText(option: any) {
    if (option) {
      return option.nameInEng;
    }
    return ''
  }

  filter(val: string): Observable<any> | null {

    return this.medicineService.getMedicines(0, 20, val.toLowerCase())
      .pipe(
        map((response: any) => {
          return response.data
        })
      )
  }

}
