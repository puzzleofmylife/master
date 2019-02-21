import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/Patient';
import { PatientService } from '../../services/patient.service';

@Component({
	selector: 'app-patient-personal-details',
	templateUrl: './patient-personal-details.component.html',
	styleUrls: ['./patient-personal-details.component.css']
})
export class PatientPersonalDetailsComponent implements OnInit {
	patient: Patient = new Patient();
	loading: boolean;

	constructor(private _patientService: PatientService, private router: Router) { }

	ngOnInit() {
		this.loading = true;
		this._patientService.getPatient().subscribe(response => {
			this.patient = response;
			this.loading = false;
		}, error => {
			this.loading = false;
			console.error(JSON.stringify(error));
		});
	}
	navigateToPatientUpdateDetails() {
		this.router.navigate(['/profile/update-details']);
	}
}
