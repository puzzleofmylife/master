import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistSessionComponent } from './psychologist-session.component';

describe('PsychologistSessionComponent', () => {
  let component: PsychologistSessionComponent;
  let fixture: ComponentFixture<PsychologistSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologistSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologistSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
