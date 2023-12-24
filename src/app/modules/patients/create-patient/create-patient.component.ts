import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {LiveAnnouncer} from "@angular/cdk/a11y";
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {Location} from "../../../core/interfaces/location";
import {ActivatedRoute, Router} from "@angular/router";
import {Specialization} from "../../../core/interfaces/specialization";
import {PatientService} from "../../../core/services/patient.service";
import {Patient} from "../../../core/interfaces/patient";

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit {
  createPatient: FormGroup;
  maritalStatus = [
    {
      "code": "SINGLE",
      "text": "اعزب",
    },
    {
      "code": "MARRIED",
      "text": "متزوج/متزوجه",
    },
    {
      "code": "WIDOWED",
      "text": "ارمل/ارملة",
    },
    {
      "code": "DIVORCED",
      "text": "مطلقة",
    },
  ]
  locations: Location[] = []
  insuranceTypes = [
    {type: 'NONE', text: 'لايوجد'},
    {type: 'STATE_INSURANCE', text: 'تامين دولة'},
    {type: 'STATE_EXPENSE', text: 'نفقة دولة'},
  ]
  specializations: Specialization[];
  editor = DecoupledEditor;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  mobileNumbers: string[] = [];
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  public readonly router: Router = inject(Router);
  announcer = inject(LiveAnnouncer);
  private patientService: PatientService = inject(PatientService)

  constructor(private fb: FormBuilder) {
    this.createPatient = this.fb.group({
      name: ['', [Validators.required]],
      nationalID: ['', [Validators.required, Validators.pattern('^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$')]],
      nameOfParent: ['',],
      nationalIDForParent: ['', [Validators.pattern('^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$')]],
      maritalStatus: ['', [Validators.required]],
      numberOfFamilyMembers: ['', [Validators.required]],
      locationsId: ['', [Validators.required]],
      address: ['', [Validators.required]],
      addressLink: [''],
      dateOfHelp: [''],
      discoveryDetailsWithImageLink: [''],
      periodOfDiscovery: [''],
      thereInsurance: ['NONE'],
      volunteerName: [''],
      volunteerMobileNumber: [''],
      dateOfBeginningOfDecision: [''],
      specializations: [[]],
    })
  }

  ngOnInit() {
    this.route.data.subscribe((res: any) => {
      if (res.patient) {
        this.createPatient.patchValue({...res.patient})
        this.mobileNumbers = (res.patient as Patient).mobileNumbers
      }
      this.locations = res.locations['data'];
      this.specializations = res.specialization;
    })
    if (this.router.url.includes('create')) {
      console.log(this.route.snapshot.paramMap.get('locationId')!);
      this.createPatient.get('locationsId')?.setValue(parseInt(this.route.snapshot.paramMap.get('locationId')!))
      this.createPatient.get('locationsId')?.disable();
    }
  }


  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.mobileNumbers.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.mobileNumbers.indexOf(fruit);

    if (index >= 0) {
      this.mobileNumbers.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(fruit: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(fruit);
      return;
    }

    const index = this.mobileNumbers.indexOf(fruit);
    if (index >= 0) {
      this.mobileNumbers[index] = value;
    }
  }

  public onReady(editor: DecoupledEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  submit() {
    let formData = this.createPatient.getRawValue();
    formData['mobileNumbers'] = this.mobileNumbers
    if (this.router.url.includes('edit')) {
      this.patientService.editPatient( this.route.snapshot.paramMap.get('id')!,formData).subscribe((res) => {
        this.router.navigate(['/locations/' + formData.locationsId!])
      })
    } else {
      this.patientService.createPatient(formData).subscribe((res) => {
        this.router.navigate(['/locations/' + formData.locationsId!])
      })
    }

  }
}
