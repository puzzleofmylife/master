import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email-send',
  templateUrl: './confirm-email-send.component.html',
  styleUrls: ['./confirm-email-send.component.css']
})
export class ConfirmEmailSendComponent implements OnInit {

  success: boolean;
  loaded: boolean;
  resultText: string;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let email = params['email'];

      this.userService.sendConfirmEmailLink(email).subscribe(result => {
        this.success = true;
        this.loaded = true;
        this.resultText = `Email confirmation link sent to ${email}`;
      }, error => {
        this.success = false;
        this.loaded = true;
        this.resultText = `Could not send email confirmation link`;
        console.log(JSON.stringify(error.error));
      });
    });
  }

}
