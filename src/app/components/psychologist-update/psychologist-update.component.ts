import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PsychoService } from 'src/app/services/psycho.service';
import { Psychologist } from 'src/app/models/Psychologist';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { AuthState } from 'src/app/models/AuthState';

@Component({
	selector: 'app-psychologist-update',
	templateUrl: './psychologist-update.component.html',
	styleUrls: ['./psychologist-update.component.css']
})
export class PsychologistUpdateComponent implements OnInit {

	@ViewChild("photoFile") photoFile: ElementRef;
	@ViewChild("idDocFile") idDocFile: ElementRef;
	@ViewChild("cvFile") cvFile: ElementRef;
	@ViewChild("licenseFile") licenseFile: ElementRef;

	updatePsychologistForm: FormGroup;
	maxFileSizeBytes: number = 5242880;
	psychologist: Psychologist = new Psychologist();

	submitted: Boolean = false;
	errors: Boolean = false;
	loading: Boolean = false;
	needsEmailConfirmation: Boolean;
	errorMessage: string;
	resultText: string;
	saving: boolean;
	authState: AuthState;

	constructor(
		private _psychogistService: PsychoService,
		private _formBuilder: FormBuilder,
		private _location: Location,
		private _route: ActivatedRoute,
		private _router: Router,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.authService.authState().subscribe(x => this.authState = x);
		this.createPsyUpdateForm();
		this.initPsychUpdateForm();
	}

	createPsyUpdateForm(): void {
		this.updatePsychologistForm = this._formBuilder.group({
			/* Personal details*/
			firstName: ['', Validators.required],
			surname: ['', Validators.required],
			idNumber: ['', Validators.required],
			age: ['', Validators.required],
			contactNum: ['', [Validators.required, Validators.pattern('[0-9]+')]],
			email: ['', [Validators.required, Validators.email]],
			commissionPercent: ['', [Validators.required, Validators.max(100), Validators.min(0)]],
			/* Banking details */
			bankName: ['', Validators.required],
			accountType: ['', Validators.required],
			accountNum: ['', Validators.required],
			branchCode: ['', Validators.required],
			/* Professional details */
			qualification: ['', Validators.required],
			yearsOfExperience: ['', Validators.required],
			licenseNum: ['', Validators.required],
			/* Attachments */
			photoFile: [''],
			idDocFile: [''],
			cvFile: [''],
			licenseFile: ['']
		});
	}

	initPsychUpdateForm(): void {
		this.loading = true;
		const id = +this._route.snapshot.paramMap.get('id');
		this._psychogistService.getById(id).subscribe(response => {
			this.updatePsychologistForm.controls.firstName.setValue(response.firstName);
			this.updatePsychologistForm.controls.surname.setValue(response.lastName);
			this.updatePsychologistForm.controls.idNumber.setValue(response.idNumber);
			this.updatePsychologistForm.controls.age.setValue(response.age);
			this.updatePsychologistForm.controls.contactNum.setValue(response.phoneNumber);
			this.updatePsychologistForm.controls.email.setValue(response.email);
			this.updatePsychologistForm.controls.bankName.setValue(response.bankName);
			this.updatePsychologistForm.controls.accountType.setValue(response.accountType);
			this.updatePsychologistForm.controls.accountNum.setValue(response.accountNumber);
			this.updatePsychologistForm.controls.branchCode.setValue(response.branchCode);
			var qualification = response.qualifications.length == 0 ? '' : response.qualifications[0];
			this.updatePsychologistForm.controls.qualification.setValue(qualification);
			this.updatePsychologistForm.controls.yearsOfExperience.setValue(response.experienceYears);
			this.updatePsychologistForm.controls.licenseNum.setValue(response.licenseNumber);
			this.updatePsychologistForm.controls.commissionPercent.setValue(response.paymentPercent);
			this.psychologist.id = response.id;
			this.loading = false;
		});

	}
	async onPsychUpdateSubmit() {
		this.submitted = true;
		if (this.updatePsychologistForm.valid) {
			this.psychologist.firstName = this.updatePsychologistForm.controls.firstName.value;
			this.psychologist.lastName = this.updatePsychologistForm.controls.surname.value;
			this.psychologist.idNumber = this.updatePsychologistForm.controls.idNumber.value;
			this.psychologist.age = this.updatePsychologistForm.controls.age.value;
			this.psychologist.phoneNumber = this.updatePsychologistForm.controls.contactNum.value;
			this.psychologist.email = this.updatePsychologistForm.controls.email.value;
			this.psychologist.bankName = this.updatePsychologistForm.controls.bankName.value;
			this.psychologist.accountType = this.updatePsychologistForm.controls.accountType.value;
			this.psychologist.accountNumber = this.updatePsychologistForm.controls.accountNum.value;
			this.psychologist.branchCode = this.updatePsychologistForm.controls.branchCode.value;
			this.psychologist.qualifications = [];
			this.psychologist.qualifications.push(this.updatePsychologistForm.controls.qualification.value);
			this.psychologist.experienceYears = this.updatePsychologistForm.controls.yearsOfExperience.value;
			this.psychologist.licenseNumber = this.updatePsychologistForm.controls.licenseNum.value;
			this.psychologist.paymentPercent = this.updatePsychologistForm.controls.commissionPercent.value;
			this.psychologist.attachments = await this.generateAttachments();
			this.saving = true;

			this._psychogistService.updatePsychologist(this.psychologist).subscribe(response => {
				this.saving = false;
				if (response.needsEmailConfirmation) {
					this.needsEmailConfirmation = true;
					this.resultText = "We've sent a confirmation email. Please confirm your email address to complete the update.";
				} else {
					this._router.navigate(['/profile/psychologist', this.psychologist.id]);
				}
			}, error => {
				this.errors = true;
				this.saving = false;
				if (error.error.DuplicateEmail) {
					this.errorMessage = "Email address already exists.";
				} else {
					this.errorMessage = "An error occured.";
					console.error(JSON.stringify(error));
				}
			});
		} else {
			this.errors = true;
			this.errorMessage = 'Please ensure that all fields are valid.';
		}
	}
	/* File size attachment validation */
	onCVFileChange(event) {
		if (event.target.files && event.target.files[0]) {
			if (event.target.files[0].size > this.maxFileSizeBytes) {
				this.updatePsychologistForm.controls.cvFile.setErrors({ tooLarge: true });
			}
			else {
				this.updatePsychologistForm.controls.cvFile.setErrors(null);
			}
		}
	}

	onIdDocFileChange(event) {
		if (event.target.files && event.target.files[0]) {
			if (event.target.files[0].size > this.maxFileSizeBytes) {
				this.updatePsychologistForm.controls.idDocFile.setErrors({ tooLarge: true });
			} else {
				this.updatePsychologistForm.controls.idDocFile.setErrors(null)
			};
		}
	}

	onPhotoFileChange(event) {
		this.updatePsychologistForm.controls.photoFile.setErrors(null);
		if (event.target.files && event.target.files[0]) {
			if (event.target.files[0].size > this.maxFileSizeBytes) {
				this.updatePsychologistForm.controls.photoFile.setErrors({ tooLarge: true });
			} else {
				this.updatePsychologistForm.controls.photoFile.setErrors(null);
			}

			if (event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/jpg"
				|| event.target.files[0].type == "image/png") {
				this.updatePsychologistForm.controls.photoFile.setErrors(null);
			} else {
				this.updatePsychologistForm.controls.photoFile.setErrors({ isPDF: true });
			}
		}
	}

	onLicenseFileChange(event) {
		if (event.target.files && event.target.files[0]) {
			if (event.target.files[0].size > this.maxFileSizeBytes) {
				this.updatePsychologistForm.controls.licenseFile.setErrors({ tooLarge: true });
			} else {
				this.updatePsychologistForm.controls.licenseFile.setErrors(null);
			}
		}
	}

	private async generateAttachments() {
		/* 
		'1','CV'
		'2','Photo'
		'3','Certificate or License'
		'4','ID' 
		*/

		let attachments = [];
		let photoFileEl = this.photoFile.nativeElement;
		if (photoFileEl.files && photoFileEl.files[0]) {
			let fileToUpload = photoFileEl.files[0];
			let attachment = await this.attachmentReader(fileToUpload, 2);
			attachments.push(attachment);
		}
		let cvFileEl = this.cvFile.nativeElement;
		if (cvFileEl.files && cvFileEl.files[0]) {
			let fileToUpload = cvFileEl.files[0];
			let attachment = await this.attachmentReader(fileToUpload, 1);
			attachments.push(attachment);
		}
		let idDocFileEl = this.idDocFile.nativeElement;
		if (idDocFileEl.files && idDocFileEl.files[0]) {
			let fileToUpload = idDocFileEl.files[0];
			let attachment = await this.attachmentReader(fileToUpload, 4);
			attachments.push(attachment);
		}
		let licenseFileEl = this.licenseFile.nativeElement;
		if (licenseFileEl.files && licenseFileEl.files[0]) {
			let fileToUpload = licenseFileEl.files[0];
			let attachment = await this.attachmentReader(fileToUpload, 3);
			attachments.push(attachment);
		}

		return attachments;
	}

	private attachmentReader(file: any, attachmentType: any) {
		return new Promise((resolve) => {
			var fr = new FileReader();
			fr.onloadend = () => {
				resolve({
					TypeId: attachmentType,
					FileName: file.name,
					Base64File: fr.result.toString().split(',').pop()
				});
			};
			fr.readAsDataURL(file);
		});
	}

	cancel() {
		this._location.back();
	}
}
