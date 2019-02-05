import { Component, OnInit, Input } from '@angular/core';
import { PsychoService } from 'src/app/services/psycho.service';
import { Transaction } from 'src/app/models/Transaction';

@Component({
  selector: 'app-psychologist-transactions',
  templateUrl: './psychologist-transactions.component.html',
  styleUrls: ['./psychologist-transactions.component.css']
})
export class PsychologistTransactionsComponent implements OnInit {

  private _psychologistId: number;
  @Input() set psychologistId(value: number) {
    if (value) {
      this._psychologistId = value;
      this.load();
    }
  }

  loading: boolean;
  transactions: Transaction[] = [];
  limit: number = 30;
  page: number = 0;
  loadMore: boolean;

  constructor(private psychService: PsychoService) { }

  ngOnInit() {
  }

  load() {
    this.page++;
    this.loading = true;

    this.psychService.getTransactions(this._psychologistId, this.limit, this.page).subscribe(resp => {
      this.loading = false;
      this.transactions.push(...resp);

      if (resp.length == this.limit)
        this.loadMore = true;
      else
        this.loadMore = false;
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }

}
