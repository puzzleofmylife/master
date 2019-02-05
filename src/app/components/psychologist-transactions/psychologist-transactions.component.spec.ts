import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistTransactionsComponent } from './psychologist-transactions.component';

describe('PsychologistTransactionsComponent', () => {
  let component: PsychologistTransactionsComponent;
  let fixture: ComponentFixture<PsychologistTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologistTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologistTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
