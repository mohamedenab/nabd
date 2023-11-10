import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsMedicinesComponent } from './patient-details-medicines.component';

describe('PatientDetailsMedicinesComponent', () => {
  let component: PatientDetailsMedicinesComponent;
  let fixture: ComponentFixture<PatientDetailsMedicinesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDetailsMedicinesComponent]
    });
    fixture = TestBed.createComponent(PatientDetailsMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
