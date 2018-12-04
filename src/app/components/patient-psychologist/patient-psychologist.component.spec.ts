import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPsychologistComponent } from './patient-psychologist.component';

describe('PatientPsychologistComponent', () => {
  let component: PatientPsychologistComponent;
  let fixture: ComponentFixture<PatientPsychologistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientPsychologistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientPsychologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
