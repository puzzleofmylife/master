import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSessionComponent } from './patient-session.component';

describe('PatientSessionComponent', () => {
  let component: PatientSessionComponent;
  let fixture: ComponentFixture<PatientSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
