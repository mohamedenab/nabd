import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineManagementComponent } from './medicine-management.component';

describe('MedicineMangementComponent', () => {
  let component: MedicineManagementComponent;
  let fixture: ComponentFixture<MedicineManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineManagementComponent]
    });
    fixture = TestBed.createComponent(MedicineManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
