import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout-result',
  templateUrl: './checkout-result.component.html',
  styleUrls: ['./checkout-result.component.css']
})
export class CheckoutResultComponent implements OnInit {
  loaded: boolean = false;
  success: boolean = false;
  resultText: string;
  resultHeading: string;
  resultButtonText: string = 'Back to profile';
  resultButtonLink: string = '/profile';
  result: any;
  isSignup: boolean;
  psychName: string;

  constructor(private paymentService: PaymentService, private route: ActivatedRoute) { }

  ngOnInit() {
    //Get checkoutId
    this.route.queryParams.subscribe(async params => {
      var checkoutId = params['id'];
      this.isSignup = params['signup'] == '1' ? true : false;
      this.psychName = params['psych'] ? decodeURI(params['psych']) : null;

      try {
        this.result = await this.paymentService.getCheckoutStatus(checkoutId);

        this.loaded = true;
        this.success = this.result.success;

        if (this.success && this.isSignup) {
          this.resultText = `You are now signed up and ready to go!
          <br /><br />
          Your psychologist ${this.psychName} can't wait to meet you. Click the button below to start your first
          session.`;
          this.resultHeading = 'Thank you';
          this.resultButtonLink = '/session';
          this.resultButtonText = 'Start session';
        } else if (this.success) {
          this.resultText = 'Your payment details have been updated.';
        } else {
          this.resultText = `Your payment details could not be updated. <br/><br/>Reason: '${this.result.peachResponse.result.description}'`;
        }

        if (this.result.peachResponse.result.code == '200.300.404') {
          //Checkout ID no longer exists
          this.resultText = 'This page is no longer valid';
        }

        if (!this.result.success)
          console.info(JSON.stringify(this.result));
      }
      catch (error) {
        this.loaded = true;
        console.error(JSON.stringify(error));
        this.resultText = 'Error occurred, could not update your payment details.';
      }
    });
  }

}
