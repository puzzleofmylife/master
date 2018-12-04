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

  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let userId = params['i'];
      let confirmToken = params['t'];
      this.isPsych = params['psych'] == "1" ? true : false;

      this.userService.confirmEmail(userId, encodeURIComponent(confirmToken)).subscribe(result => {
        this.success = true;
        this.loaded = true;
        this.authService.setAccessToken(result.token);
      }, error => {
        this.success = false;
        this.loaded = true;
        console.log(JSON.stringify(error.error));
      });
    });
  }

}
