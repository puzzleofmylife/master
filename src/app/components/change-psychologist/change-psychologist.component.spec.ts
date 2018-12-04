import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePsychologistComponent } from './change-psychologist.component';

describe('ChangePsychologistComponent', () => {
  let component: ChangePsychologistComponent;
  let fixture: ComponentFixture<ChangePsychologistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePsychologistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePsychologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
