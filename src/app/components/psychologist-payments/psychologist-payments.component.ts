import { Component, OnInit } from '@angular/core';
import { PsychoService } from 'src/app/services/psycho.service';
import { PsychologistPaymentInfo } from 'src/app/models/PsychologistPaymentInfo';
import { PsychologistPayment } from 'src/app/models/PsychologistPayment';

@Component({
  selector: 'app-psychologist-payments',
  templateUrl: './psychologist-payments.component.html',
  styleUrls: ['./psychologist-payments.component.css']
})
export class PsychologistPaymentsComponent implements OnInit {
  limit: number = 30;
  page: number = 0;
  paymentsDue: PsychologistPaymentInfo[] = [];
  hideLoadMore: boolean;
  loading: boolean;
  balanceDate: Date;
  showPrompt: boolean;
  currentPsychologistPaymentInfo: PsychologistPaymentInfo;
  promptText: string;

  constructor(private psychService: PsychoService) { }

  ngOnInit() {
    this.psychService.getBalanceDate().subscribe(resp => {
      this.balanceDate = resp.balanceDate;
      if (resp.length < this.limit)
        this.hideLoadMore = true;
    }, error => {
      console.error(JSON.stringify(error));
    });

    this.load();
  }

  private load() {
    this.page++;
    this.loading = true;
    this.psychService.getPaymentsDue(this.limit, this.page).subscribe(resp => {
      this.loading = false;

      this.paymentsDue.push(...resp);
      if (resp.length < this.limit)
        this.hideLoadMore = true;
    }, error => {
      console.error(JSON.stringify(error));
    });
  }

  loadMore() {
    this.page++;
    this.load();
  }

  getBankingDetails(paymentInfo: PsychologistPaymentInfo) {
    return `<div><b>Bank:</b> ${paymentInfo.bankName}</div>` + 
    `<div><b>Account type:</b> ${paymentInfo.accountType}</div>` + 
    `<div><b>Account number:</b> ${paymentInfo.accountNumber}</div>` + 
    `<div><b>Branch:</b> ${paymentInfo.branchCode}</div>`;
  }

  showRecordPaymentPrompt(paymentInfo: PsychologistPaymentInfo) {
    this.showPrompt = true;
    this.currentPsychologistPaymentInfo = paymentInfo;
    this.promptText = `Do you confirm you have made a payment of <b>R${paymentInfo.balance}</b> to ${paymentInfo.psychologistName}?`;
  }

  handlePromptResult(promptResult: any) {
    this.showPrompt = false;
    
    if(!promptResult.proceed) {
      return;
    }

    var psychPayment = <PsychologistPayment> {
      amount: this.currentPsychologistPaymentInfo.balance,
      description: 'EFT Payment',
      psychologistId: this.currentPsychologistPaymentInfo.psychologistId
    }

    this.paymentsDue = [];
    this.page = 0;
    this.loading = true;
    this.psychService.addPayment(psychPayment).subscribe(resp => {
      this.load();
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }
}
