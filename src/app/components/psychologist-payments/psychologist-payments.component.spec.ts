import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistPaymentsComponent } from './psychologist-payments.component';

describe('PsychologistPaymentsComponent', () => {
  let component: PsychologistPaymentsComponent;
  let fixture: ComponentFixture<PsychologistPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologistPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologistPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
