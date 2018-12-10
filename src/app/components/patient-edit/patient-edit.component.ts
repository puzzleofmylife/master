import { PatientService } from 'src/app/services/patient.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/models/Patient';

@Component({
	selector: 'app-patient-edit',
	templateUrl: './patient-edit.component.html',
	styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

	patientEditForm: FormGroup;
	submitted: boolean;
	loading: boolean = true;
	success: boolean;
	resultText: string;
	gotResult: boolean;

	constructor(private _patientService: PatientService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.patientEditForm = this.formBuilder.group({
			patientAlias: ['', Validators.required],
			patientEmail: ['', [Validators.required, Validators.email]]
		});
		this._patientService.getPatient().subscribe(response => {
			this.loading = false;
			this.patientEditForm.controls.patientEmail.setValue(response.email);
			this.patientEditForm.controls.patientAlias.setValue(response.alias)
		});
	}

	/*update patient personal details*/
	onUpdatePatientDetailsSubmit(): void {
		this.submitted = true;
		let patientUser: Patient = new Patient();

		if (this.patientEditForm.valid) {
			this.loading = true;
			patientUser.alias = this.patientEditForm.controls.patientAlias.value;
			patientUser.email = this.patientEditForm.controls.patientEmail.value;

			this._patientService.updatePatient(patientUser).subscribe(response => {
				this.success = true;
				this.setResultFlags();
				if (response.needsEmailConfirmation) {
					this.resultText = "We've sent a confirmation email to your new email address. Please confirm your email address to complete the update.";
				} else {
					this.resultText = "Personal details updated successfully.";
				}
			}, error => {
				this.setResultFlags();
				this.success = false;
				if (error.error.DuplicateEmail) {
					this.resultText = "Email address already exists.";
				}
				else {
					this.resultText = "An error occured.";
					console.error(JSON.stringify(error));
				}
			});
		}
	}

	setResultFlags(): void {
		this.loading = false;
		this.gotResult = true;
	}
}
