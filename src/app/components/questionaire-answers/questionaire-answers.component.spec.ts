import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionaireAnswersComponent } from './questionaire-answers.component';

describe('QuestionaireAnswersComponent', () => {
  let component: QuestionaireAnswersComponent;
  let fixture: ComponentFixture<QuestionaireAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionaireAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionaireAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
