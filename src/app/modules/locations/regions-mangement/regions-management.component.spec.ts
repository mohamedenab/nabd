import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsManagementComponent } from './regions-management.component';

describe('RegionsMangementComponent', () => {
  let component: RegionsManagementComponent;
  let fixture: ComponentFixture<RegionsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegionsManagementComponent]
    });
    fixture = TestBed.createComponent(RegionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
