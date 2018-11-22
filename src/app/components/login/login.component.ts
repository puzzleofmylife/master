import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

	constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: [''],
			password: ['']
		},
		{ validator: this.validateIsFilled });
	}

	onLoginSubmit() {
		this.showLoginFailed = false;
		this.showError = false;
		this.submitted = true;

		if (this.loginForm.valid) {
			this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
				.subscribe(result => {
					this.router.navigate(['/']);
				}, error => {
					if (error.error.LoginFailed)
						this.showLoginFailed = true;
					else
						this.showError = true;

					console.error('Login failed or error: ' + JSON.stringify(error.error));
				})
		}
	}

	validateIsFilled(group: FormGroup) {
		//We need to manually validate that these fields are filled because mobile Chrome autofill/complete does not seem to trigger the angular required validator 
		//e.g if fields are auto-filled, the required field validators are still fired
		let password = group.controls.password.value;
        let email = group.controls.email.value;

        if (password.trim() != '' && email.trim() != '')
			return null;
			
        if (email.trim() == '') {
			group.controls.email.setErrors({ isFilled: false });
		}

		if (password.trim() == '') {
			group.controls.password.setErrors({ isFilled: false });
		}
    }
}
