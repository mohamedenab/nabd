import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsManagementComponent } from './patients-management.component';

describe('PatientsManagementComponent', () => {
  let component: PatientsManagementComponent;
  let fixture: ComponentFixture<PatientsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientsManagementComponent]
    });
    fixture = TestBed.createComponent(PatientsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
