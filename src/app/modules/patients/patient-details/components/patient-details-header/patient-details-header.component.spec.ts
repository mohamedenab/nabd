import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailsHeaderComponent } from './patient-details-header.component';

describe('PatientDetailsHeaderComponent', () => {
  let component: PatientDetailsHeaderComponent;
  let fixture: ComponentFixture<PatientDetailsHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientDetailsHeaderComponent]
    });
    fixture = TestBed.createComponent(PatientDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
