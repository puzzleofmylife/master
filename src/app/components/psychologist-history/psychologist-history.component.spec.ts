import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistHistoryComponent } from './psychologist-history.component';

describe('PsychologistHistoryComponent', () => {
  let component: PsychologistHistoryComponent;
  let fixture: ComponentFixture<PsychologistHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologistHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologistHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
