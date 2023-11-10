import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsManagementComponent } from './locations-management.component';

describe('RegionsMangementComponent', () => {
  let component: LocationsManagementComponent;
  let fixture: ComponentFixture<LocationsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsManagementComponent]
    });
    fixture = TestBed.createComponent(LocationsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
