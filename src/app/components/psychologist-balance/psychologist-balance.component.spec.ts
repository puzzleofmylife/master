import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistBalanceComponent } from './psychologist-balance.component';

describe('PsychologistBalanceComponent', () => {
  let component: PsychologistBalanceComponent;
  let fixture: ComponentFixture<PsychologistBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologistBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologistBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
