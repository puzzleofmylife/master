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
  result: any;
  isSignup: boolean;

  constructor(private paymentService: PaymentService, private route: ActivatedRoute) { }

  ngOnInit() {
    //Get checkoutId
    this.route.queryParams.subscribe(async params => {
      var checkoutId = params['id'];
      this.isSignup = params['signup'] == '1' ? true : false;
      
      try { 
        this.result = await this.paymentService.getCheckoutStatus(checkoutId);

        this.loaded = true;
        this.success = this.result.success;
        
        if(!this.result.Success)
          console.info(JSON.stringify(this.result));
      }
      catch(error) {
        this.loaded = true;
        console.error(JSON.stringify(error));
      }
    });
  }

}
