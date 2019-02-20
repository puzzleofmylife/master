import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { PsychoService } from 'src/app/services/psycho.service';
import { Psychologist } from 'src/app/models/Psychologist';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

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
  resultButtonText: string;
  cmpState: string;
  rating: number;
  patientPsych: Psychologist;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private psychService: PsychoService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit() {
    this.availablePsychologistsForm = this.formBuilder.group({
      psychologistChoice: ['', Validators.required]
    });

    this.loading = true;
    this.patientService.getPsychologist().subscribe(resp => {
      this.patientPsych = resp;
      if (this.patientPsych) {
        this.cmpState = 'show_rating';
        this.getAvailPsychs(this.patientPsych.id);
      }
      else {
        this.cmpState = 'show_psychs';
        this.getAvailPsychs(0);
      }
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
      if (this.rating) {
        this.loading = true;
        this.patientService.ratePsychologist(this.rating).subscribe(result => {
          this.changePsychologist();
        }, error => {
          console.error(JSON.stringify(error));
          this.changePsychologist();
        });
      }
      else
        this.changePsychologist();
    }
  }

  private changePsychologist() {
    this.loading = true;
    var newPsychologistId = this.availablePsychologistsForm.controls.psychologistChoice.value;
    this.patientService.changePsychologist(newPsychologistId).subscribe(result => {
      this.loading = false;
      this.toastService.setSuccess();
      this.router.navigate(['/profile']);
    }, error => {
      this.loading = false;
      this.toastService.setError();
      console.error(JSON.stringify(error));
    });
  }

  handleRatingClick(event: number) {
    this.rating = event;
  }

}
