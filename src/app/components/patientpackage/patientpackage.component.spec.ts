import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientpackageComponent } from './patientpackage.component';

describe('PatientpackageComponent', () => {
  let component: PatientpackageComponent;
  let fixture: ComponentFixture<PatientpackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientpackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
