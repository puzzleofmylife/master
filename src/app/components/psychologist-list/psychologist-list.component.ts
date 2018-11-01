import { Component, OnInit } from '@angular/core';
import { PsychoService } from 'src/app/services/psycho.service';

@Component({
  selector: 'app-psychologist-list',
  templateUrl: './psychologist-list.component.html',
  styleUrls: ['./psychologist-list.component.css']
})
export class PsychologistListComponent implements OnInit {
  statusId: number = 2;
  status: any[];

  constructor(private psychoService: PsychoService) {
  }

  ngOnInit() {
    if (this.statusId) {
      this.psychoService.getById(this.statusId).subscribe(data => {
        this.status = data;
      })
    }
  }
}
