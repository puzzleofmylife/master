import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	submitted = false;
	loginForm: FormGroup;
	showLoginFailed: boolean;
	showError: boolean;
	loading: boolean = false;
	showConfirmEmail: boolean;

	constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	onLoginSubmit() {
		this.showLoginFailed = false;
		this.showError = false;
		this.submitted = true;

		if (this.loginForm.valid) {
			this.loading = true;
			this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
				.subscribe(result => {
					this.loading = false;
					var authState = this.authService.getAuthState();

					if (authState.IsAdmin)
						this.router.navigate(['/admin/psychologists']);

					if (authState.IsPatient)
						this.router.navigate(['/session']);

					if (authState.IsPsychologist)
						this.router.navigate(['/psychologist/patients']);
				}, error => {
					this.loading = false;
					if (error.error.LoginFailed)
						this.showLoginFailed = true;
					else if (error.error.IsNotAllowed)
						this.showConfirmEmail = true;
					else
						this.showError = true;

					console.error('Login failed or error: ' + JSON.stringify(error.error));
				})
		}
	}

	sendEmailConfirmationLink() {
		this.router.navigate(['/confirmemail/send'], { queryParams: { email: this.loginForm.controls.email.value } });
	}
}
