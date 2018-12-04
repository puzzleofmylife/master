import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	@ViewChild('email') private emailElem: ElementRef;
	@ViewChild('password') private passwordElem: ElementRef;
	email: string;
	password: string;

	showLoginFailed: boolean;
	showError: boolean;
	loading: boolean = false;
	showConfirmEmail: boolean;
	
	emailRequired: boolean;
	passwordRequired: boolean;

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit() {
	}

	onLoginSubmit() {
		this.showLoginFailed = false;
		this.showError = false;
		this.showConfirmEmail = false;
		
		if (this.validateFields()) {
			this.loading = true;
			this.authService.login(this.email, this.password)
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

	validateFields(): boolean {

		//We need to use nativeElement.value because chrome autofill does not seem trigger Angular value updates (so binded values from the form are null)
		this.email = this.emailElem.nativeElement.value;
		this.password = this.passwordElem.nativeElement.value;
		
		if(!this.email || this.email.trim() == '')
			this.emailRequired = true;
		else
			this.emailRequired = false;
		
		if(!this.password || this.password.trim() == '')
			this.passwordRequired = true;
		else
			this.passwordRequired = false;

		if(this.passwordRequired || this.emailRequired)
			return false;
		else
			return true;
	}

	sendEmailConfirmationLink() {
		this.router.navigate(['/confirmemail/send'], { queryParams: { email: this.email } });
	}
}
