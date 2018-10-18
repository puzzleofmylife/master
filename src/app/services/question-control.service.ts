import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientQuestion } from '../models/PatientQuestion';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: PatientQuestion[] ) {
    let group: any = {};

    questions.forEach(question => {
      group['question' + question.id] = new FormControl('');
    });
    return new FormGroup(group);
  }
}