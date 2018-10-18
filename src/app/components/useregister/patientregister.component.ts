import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { User } from '../../models/User';
import { PatientQuestion } from 'src/app/models/PatientQuestion';
import { PatientService } from 'src/app/services/patient.service';

@Component({
    templateUrl: 'patientregister.component.html',
})

export class PatientRegisterComponent implements OnInit {
    patientQuestionForm: FormGroup = new FormGroup({});
    patientPersonalForm: FormGroup;
    loading = false;
    submitted = false;
    page: number = 1;
    finalSubmitError: boolean = false;
    duplicateAlias: boolean;
    successEmailAddress: string;
    patientQuestions: PatientQuestion[];
    patientAnswers: any[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private patientService: PatientService
    ) { }


    ngOnInit() {

        this.patientPersonalForm = this.formBuilder.group({
            patientAlias: ['', Validators.required],
            patientEmail: ['', [Validators.required, Validators.email]],
            patientPassword: ['', Validators.required],
            patientConfirmPassword: ['', Validators.required]
        },
            { validator: this.validatePassword });

        this.initQuestionForm();
    }

    initQuestionForm() {
        this.patientService.getQuestions().subscribe(questions => {
            let group: any = {};
            questions.forEach(question => {
                if (question.type == 1) {
                    const arr = question.multipleChoiceOptions.split(';').map((possibleAnswer, index) => {
                        return new FormControl(false);
                    });
                    group['question' + question.id] = this.formBuilder.array(arr);
                }
                else
                    group['question' + question.id] = new FormControl('');
            });
            this.patientQuestionForm = new FormGroup(group);
            this.patientQuestions = questions;
        },
            error => {
                console.log('Could not get patient questions: ' + JSON.stringify(error.error));
            });
    }

    getPatientQuestionFormControl(controlName: string) {
        return this.patientQuestionForm.controls[controlName];
    }

    /* Submit Forms */

    onPatientPersonalSubmit() {
        this.submitted = true;
        if (this.patientPersonalForm.valid) {
            this.submitted = false;
            this.page = 2;
        }
    }

    onPatientQuestionsSubmit() {
        this.submitted = true;
        if (this.patientQuestionForm.valid) {

            this.processPatientQuestionForm();

            this.submitted = false;
            this.page = 3;
        }
    }

    private processPatientQuestionForm() {
        this.patientQuestions.forEach(question => {
            var answer = '';
            var questionControl = this.patientQuestionForm.controls['question' + question.id];
            if (question.type == 1) {
                var answerArr = [];
                (<FormArray>questionControl).controls.forEach((answer, index) => {
                    if (answer.value === true) {
                        answerArr.push(question.multipleChoiceOptions.split(';')[index]);
                    }
                });
                answer = answerArr.join(';');
            }
            else {
                if (questionControl.value != '')
                    answer = questionControl.value;
            }
            if (answer != '')
                this.patientAnswers.push({ id: question.id, answer: answer });
        });
    }

    async finalSubmit() {
        var newPatient = new User();
        newPatient.alias = this._patientPersonalForm.patientAlias.value;
        newPatient.email = this._patientPersonalForm.patientEmail.value;
        newPatient.password = this._patientPersonalForm.patientPassword.value
    }

    /* convenience getter for easy access to form fields */
    /* --------------------------------------------------------------------- */
    get _patientPersonalForm() { return this.patientPersonalForm.controls; }
    get _patientQuestionForm() { return this.patientQuestionForm.controls; }
    /* --------------------------------------------------------------------- */


    /* Password validation */
    /* --------------------------------------------------------------------- */
    validatePassword(group: FormGroup) {
        let pass = group.controls.patientPassword.value;
        let confirmPass = group.controls.patientConfirmPassword.value;

        if (pass === confirmPass)
            return null;
        else
            group.controls.patientConfirmPassword.setErrors({ dontMatch: true });
    }
    /* --------------------------------------------------------------------- */


}