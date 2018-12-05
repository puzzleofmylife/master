import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient } from './../../models/Patient';
import { PatientService } from './../../services/patient.service';

@Component({
	selector: 'app-patient-edit',
	templateUrl: './patient-edit.component.html',
	styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

	patientEditForm: FormGroup;
	patient = new Patient();

	constructor(
		private _patientService: PatientService,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder
	) { }

	get _patientPersonalForm() { return this.patientEditForm.controls; }

	ngOnInit() {
		this.patientEditForm = this.formBuilder.group({
			patientAlias: ['', Validators.required],
			patientEmail: ['', [Validators.required, Validators.email]],
		});

		this.patient.alias = this._patientPersonalForm.patientAlias.value;
		this.patient.email = this._patientPersonalForm.patientEmail.value;
		/* grab the patient*/
		const id = +this.route.snapshot.params["id"];
		/*
		this._patientService.getPatient(id).subscribe(response => 	
		this.patient = response);
		*/
	}

	/*update patient information*/
	async updatePatientInfo(): Promise<any> {
		 return await this._patientService.register(this.patient);

	}
}
