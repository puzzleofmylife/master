import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTermsComponent } from './patientterms.component';

describe('PatientTermsComponent', () => {
  let component: PatientTermsComponent;
  let fixture: ComponentFixture<PatientTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
