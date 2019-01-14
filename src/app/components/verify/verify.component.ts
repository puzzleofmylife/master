import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  success: boolean;
  loaded: boolean = false;
  isPsych: boolean = false;
  environment = environment;
  resultText: string;
  isEmailUpdate: boolean;

  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let userId = params['i'];
      let confirmToken = params['t'];
      this.isPsych = params['psych'] == "1" ? true : false;
      this.isEmailUpdate = params['isEmailUpdate'] == "1" ? true : false;

      this.userService.confirmEmail(userId, encodeURIComponent(confirmToken), this.isEmailUpdate).subscribe(result => {
        this.success = true;
        this.loaded = true;

        if (this.isPsych) {
          this.resultText = `Your email address has been verified.
                              <br/><br/>
                              Here's what happens next:
                              <br/><br/>
                              You will receive the outcome of your application within ${environment.applicationOutcomeDays} working days.
                                Should you not hear from us within stipulated timeframe, kindly <a href="mailto:${environment.emailAdmin}"
                                  target="_top">contact us</a>.`;
        }
        if (this.isEmailUpdate) {
          this.resultText = 'Your email address has been verified and updated.';
        } else {
          this.resultText = 'Your email address has been verified, and you are now logged in.';
        }

        this.authService.setAccessToken(result.token);
      }, error => {
        this.success = false;
        this.loaded = true;
        this.resultText = 'This link is either invalid or has expired';
        console.log(JSON.stringify(error.error));
      });
    });
  }

}
