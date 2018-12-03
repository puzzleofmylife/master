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

  constructor(private formBuilder: FormBuilder, private patientService: PatientService, private psychService: PsychoService) { }

  ngOnInit() {
    this.availablePsychologistsForm = this.formBuilder.group({
      psychologistChoice: ['', Validators.required]
    });

    this.patientService.getPsychologist().subscribe(patientPsych => {
      this.psychService.getAvailable(4).subscribe(result => {
        this.loading = false;
        //Remove patients current psychologist
        this.psychologists = result.filter(x => x.id != patientPsych.id);
      }, error => {
        this.loading = false;
        console.error(JSON.stringify(error));
      });
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }

  onPsychologistChangeSubmit() {
    this.submitted = true;
    if (this.availablePsychologistsForm.valid) {
      var newPsychologistId = this.availablePsychologistsForm.controls.psychologistChoice.value;
      this.patientService.changePsychologist(newPsychologistId).subscribe(result => {

      }, error => {
        console.error(JSON.stringify(error));
      });
    }
  }

}
