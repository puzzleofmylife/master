import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';


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

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let userId = params['i'];
      let confirmToken = params['t'];
      this.isPsych = params['psych'] == "1" ? true : false;
      console.log(this.isPsych);

      this.userService.confirmEmail(userId, encodeURIComponent(confirmToken)).subscribe(result => {
        this.success = true;
        this.loaded = true;
        var token = result.token;
        //console.log(token);
      }, error => {
        this.success = false;
        this.loaded = true;
        console.log(JSON.stringify(error.error));
      });
    });
  }

}
