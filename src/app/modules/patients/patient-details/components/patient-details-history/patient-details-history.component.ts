import {Component, inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HistoryType, patientHistory} from "../../../../../core/interfaces/patient";
import {PatientService} from "../../../../../core/services/patient.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {HotToastService} from "@ngneat/hot-toast";
import {DeleteWarningComponent} from "../../../../../shared/components/delete-warning/delete-warning.component";

@Component({
  selector: 'app-patient-details-history',
  templateUrl: './patient-details-history.component.html',
  styleUrls: ['./patient-details-history.component.scss']
})
export class PatientDetailsHistoryComponent implements OnInit {
  @Input() history: patientHistory[] = [];
  @Input() months: string[];
  @Input() years: string[];
  historyFrom: FormGroup;
  addHistory: FormGroup;
  historyType = HistoryType
  @ViewChild('addHistoryTemp') addHistoryTemp!: TemplateRef<any>;
  editId: string;
  private route = inject(ActivatedRoute);

  constructor(private dialog: MatDialog, private fb: FormBuilder, private patientService: PatientService, private toast: HotToastService) {
    this.historyFrom = this.fb.group({
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    })
    this.addHistory = this.fb.group({
      historyType: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      link: [''],
    });
    const date = new Date();
    this.historyFrom.get('year')?.setValue((date.getFullYear()).toString());
    this.historyFrom.get('month')?.setValue((date.getMonth() + 1).toString());

  }

  ngOnInit() {
    console.log('lol');
    const date = new Date();
    if (!this.months.includes((date.getMonth() + 1).toString())) {
      this.months.push((date.getMonth() + 1).toString())
    }
    if (!this.years.includes((date.getFullYear()).toString())) {
      this.years.push((date.getFullYear()).toString())
    }
  }

  openHistory() {
    this.dialog.open(this.addHistoryTemp, {panelClass: ['lg:w-[50vw]', 'w-[85vw]'], disableClose: false})
  }

  submitAddHistory() {
    this.patientService.addHistory(this.route.snapshot.paramMap.get('id')!,
      // this.historyFrom.get('month')?.value!
      this.historyFrom.get('year')?.value!, '5', this.addHistory.value).subscribe((res) => {
      this.toast.success('تم اضافة التوثيق', {duration: 5000, position: "top-right", theme: "snackbar"});
      this.dialog.closeAll();
      this.getHistory();
    })
  }

  getHistory() {
    this.patientService.getHistory(this.route.snapshot.paramMap.get('id')!,
      this.historyFrom.get('year')?.value!, this.historyFrom.get('month')?.value!).subscribe((res: patientHistory[]) => {
      this.history = res
    })
  }

  deleteHistory(id: number) {
    let dialogRef = this.dialog.open(DeleteWarningComponent, {
      disableClose: true,
      data: {message: `هل انت متاكد انك تريد حذف هذا التوثيق`}
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (res.dismiss) {
        this.patientService.deleteHistory(id.toString()).subscribe((res) => {
          this.getHistory();
          this.toast.success('تم حذف التوثيق', {duration: 5000, position: "top-right", theme: "snackbar"});

        })
      }
    })

  }

  openEditHistory(history: patientHistory) {
    this.editId = history.id.toString()
    this.addHistory.patchValue(history)
    this.dialog.open(this.addHistoryTemp, {width: '50vw', disableClose: false})

  }

  editHistory() {
    this.patientService.editHistory(this.editId, this.addHistory.value).subscribe((res) => {
      this.getHistory()
      this.dialog.closeAll()
      this.toast.success('تم تعديل التوثيق', {duration: 5000, position: "top-right", theme: "snackbar"});

    })
  }
}
