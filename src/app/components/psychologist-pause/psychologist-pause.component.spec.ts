import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistPauseComponent } from './psychologist-pause.component';

describe('PsychologistPauseComponent', () => {
  let component: PsychologistPauseComponent;
  let fixture: ComponentFixture<PsychologistPauseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologistPauseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologistPauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
