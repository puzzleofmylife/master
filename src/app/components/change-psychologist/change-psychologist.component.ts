import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { PsychoService } from 'src/app/services/psycho.service';
import { Psychologist } from 'src/app/models/Psychologist';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-psychologist',
  templateUrl: './change-psychologist.component.html',
  styleUrls: ['./change-psychologist.component.css']
})
export class ChangePsychologistComponent implements OnInit {

  psychologists: Psychologist[];
  availablePsychologistsForm: FormGroup;
  submitted: boolean;
  loading: boolean = true;
  success: boolean;
  resultText: string;
  gotResult: boolean;

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private psychService: PsychoService) { }

  ngOnInit() {
    this.availablePsychologistsForm = this.formBuilder.group({
      psychologistChoice: ['', Validators.required]
    });

    this.patientService.getPsychologist().subscribe(patientPsych => {
      if (patientPsych)
        this.getAvailPsychs(patientPsych.id);
      else
        this.getAvailPsychs(0);
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }

  private getAvailPsychs(psychId: number) {
    this.psychService.getAvailable(5).subscribe(result => {
      this.loading = false;
      //Remove patients current psychologist
      this.psychologists = result.filter(x => x.id != psychId);
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }

  onPsychologistChangeSubmit() {
    this.submitted = true;
    if (this.availablePsychologistsForm.valid) {
      this.loading = true;
      var newPsychologistId = this.availablePsychologistsForm.controls.psychologistChoice.value;
      this.patientService.changePsychologist(newPsychologistId).subscribe(result => {
        this.loading = false;
        this.gotResult = true;
        this.success = true;
        this.resultText = 'Psychologist changed'
      }, error => {
        this.loading = false;
        this.gotResult = true;
        this.success = false;
        this.resultText = 'Could not change your psychologist'
        console.error(JSON.stringify(error));
      });
    }
  }

}
