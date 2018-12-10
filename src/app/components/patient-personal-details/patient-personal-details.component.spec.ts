import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPersonalDetailsComponent } from './patient-personal-details.component';

describe('PatientPersonalDetailsComponent', () => {
  let component: PatientPersonalDetailsComponent;
  let fixture: ComponentFixture<PatientPersonalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPersonalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
