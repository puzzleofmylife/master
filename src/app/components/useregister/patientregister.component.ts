import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { User } from '../../models/User';
import { PatientQuestion } from 'src/app/models/PatientQuestion';
import { PatientService } from 'src/app/services/patient.service';
import { PsychoService } from 'src/app/services/psycho.service';
import PsychologistPublic from 'src/app/models/PsychologistPublic';
import { PackageService } from 'src/app/services/package.service';
import { Package } from 'src/app/models/Package';

@Component({
    templateUrl: 'patientregister.component.html',
    styleUrls: ['patientregister.component.css']
})

export class PatientRegisterComponent implements OnInit {
    patientQuestionForm: FormGroup = new FormGroup({});
    patientPersonalForm: FormGroup;
    availablePsychologistsForm: FormGroup;
    packagesForm: FormGroup;
    loading = false;
    submitted = false;
    page: number = 1;
    finalSubmitError: boolean = false;
    duplicateAlias: boolean;
    successEmailAddress: string;
    patientQuestions: PatientQuestion[];
    patientAnswers: any[] = [];
    availablePsychologists: PsychologistPublic[];
    activePackages: Package[];

    constructor(
        private formBuilder: FormBuilder,
        private patientService: PatientService,
        private psychService: PsychoService,
        private packageService: PackageService
    ) { }

    /* convenience getter for easy access to form fields */
    /* --------------------------------------------------------------------- */
    get _patientPersonalForm() { return this.patientPersonalForm.controls; }
    get _patientQuestionForm() { return this.patientQuestionForm.controls; }
    get _availPsychForm() { return this.availablePsychologistsForm.controls; }
    get _packageForm() { return this.packagesForm.controls; }
    /* --------------------------------------------------------------------- */

    ngOnInit() {

        this.patientPersonalForm = this.formBuilder.group({
            patientAlias: ['', Validators.required],
            patientEmail: ['', [Validators.required, Validators.email]],
            patientPassword: ['', Validators.required],
            patientConfirmPassword: ['', Validators.required]
        },
            { validator: this.validatePassword });

        this.initQuestionForm();

        this.availablePsychologistsForm = this.formBuilder.group({
            psychologistChoice: ['', Validators.required]
        });

        this.initChoosePsychForm();

        this.packagesForm = this.formBuilder.group({
            packageChoice: ['', Validators.required]
        });

        this.initChoosePackageForm();
    }

    initChoosePackageForm(): void {
        this.packageService.getActivePackages().subscribe(result => {
            this.activePackages = result;
        },
        error => {
            console.error('Could not get active packages: ' + JSON.stringify(error.error));
        });
    }

    initChoosePsychForm(): void {
        this.psychService.getAvailable(4).subscribe(result => {
            this.availablePsychologists = result;
        },
        error => {
            console.error('Could not get available psychologists: ' + JSON.stringify(error.error));
        });
    }

    initQuestionForm(): void {
        this.patientService.getQuestions().subscribe(result => {
            //We need to specifically instatiate PatientQuestion so its getters work
            var questions = result.map(x => new PatientQuestion(x));

            let group: any = {};
            questions.forEach(question => {
                if (question.type == 1) {
                    var foo = question.multipleChoiceOptionsArr;
                    var bar = question.key;
                    const arr = question.multipleChoiceOptionsArr.map(() => {
                        return new FormControl(false);
                    });
                    group[question.key] = this.formBuilder.array(arr);
                }
                else
                    group[question.key] = new FormControl('');
            });
            this.patientQuestionForm = new FormGroup(group);
            this.patientQuestions = questions;
        },
            error => {
                console.error('Could not get patient questions: ' + JSON.stringify(error.error));
            });
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

    onAvailablePsychologistsSubmit() {
        this.submitted = true;
        if (this.availablePsychologistsForm.valid) {
            this.submitted = false;
            this.page = 4;
        }
    }

    onPackageSubmit() {
        this.submitted = true;
        if (this.packagesForm.valid) {
            this.submitted = false;
            this.page = 4;
        }
    }

    async finalSubmit() {
        var newPatient = new User();
        newPatient.alias = this._patientPersonalForm.patientAlias.value;
        newPatient.email = this._patientPersonalForm.patientEmail.value;
        newPatient.password = this._patientPersonalForm.patientPassword.value
    }

    private processPatientQuestionForm() {
        this.patientQuestions.forEach(question => {
            var answer = '';
            var questionControl = this.patientQuestionForm.controls[question.key];
            if (question.type == 1) {
                var answerArr = [];
                (<FormArray>questionControl).controls.forEach((answer, index) => {
                    if (answer.value === true) {
                        answerArr.push(question.multipleChoiceOptionsArr[index]);
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