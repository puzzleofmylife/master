import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-settle-balance',
  templateUrl: './settle-balance.component.html',
  styleUrls: ['./settle-balance.component.css']
})
export class SettleBalanceComponent implements OnInit {

  loading: boolean = true;
  success: boolean;
  resultText: string;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.settleOutstandingBalance().subscribe(result => {
      this.loading = false;
      
      if(result.success) {
        this.success = true;
        this.resultText = 'Outstanding balance has been settled.';
      } else {
        this.success = false;
        this.resultText = `Outstanding balance could not be settled.<br/><br/>Reason: '${result.errorMessage}'`;
      }
    }, error => {
      this.loading = false;
      this.success = false;
      this.resultText = 'Error, outstanding balance could not be settled.';
    });
  }

}
