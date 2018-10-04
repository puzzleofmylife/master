import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychtermsComponent } from './psychterms.component';

describe('PsychtermsComponent', () => {
  let component: PsychtermsComponent;
  let fixture: ComponentFixture<PsychtermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsychtermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychtermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
