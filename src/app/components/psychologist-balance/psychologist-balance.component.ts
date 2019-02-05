import { Component, OnInit, Input } from '@angular/core';
import { PsychoService } from 'src/app/services/psycho.service';

@Component({
  selector: 'app-psychologist-balance',
  templateUrl: './psychologist-balance.component.html',
  styleUrls: ['./psychologist-balance.component.css']
})
export class PsychologistBalanceComponent implements OnInit {
  
  private _psychologistId: number;
  @Input() set psychologistId(value: number) {
    if(value) {
      this._psychologistId = value;
      this.load();
    }
  }

  balance: number;
  balanceDate: Date;

  constructor(private psychService: PsychoService) { }

  ngOnInit() {
    
  }

  private load() {
    this.psychService.getBalanceDate().subscribe(resp => {
      this.balanceDate = resp.balanceDate;
    }, error => {
      console.error(JSON.stringify(error));
    });
    this.psychService.getBalance(this._psychologistId).subscribe(resp => {
      this.balance = resp.balance;
    }, error => {
      console.error(JSON.stringify(error));
    });
  }
}
