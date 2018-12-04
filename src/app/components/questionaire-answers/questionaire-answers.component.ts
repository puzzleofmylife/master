import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import PatientQuestionAnswer from 'src/app/models/PatientQuestionAnswer';

@Component({
  selector: 'app-questionaire-answers',
  templateUrl: './questionaire-answers.component.html',
  styleUrls: ['./questionaire-answers.component.css']
})
export class QuestionaireAnswersComponent implements OnInit {

  @Input() questionAnswers: PatientQuestionAnswer[];
  showAnswers: boolean = false;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
  }

  answersToggle() {
    this.showAnswers = !this.showAnswers;
  }

}
