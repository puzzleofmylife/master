import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychologistUpdateComponent } from './psychologist-update.component';

describe('PsychologistUpdateComponent', () => {
  let component: PsychologistUpdateComponent;
  let fixture: ComponentFixture<PsychologistUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychologistUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychologistUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
