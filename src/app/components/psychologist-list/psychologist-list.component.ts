import { Component, OnInit } from '@angular/core';
import { PsychoService } from 'src/app/services/psycho.service';
import { PsychologistNew } from 'src/app/models/PsychologistNew';
import { PsychologistStatus } from 'src/app/models/PsychologistStatus';

@Component({
  selector: 'app-psychologist-list',
  templateUrl: './psychologist-list.component.html',
  styleUrls: ['./psychologist-list.component.css']
})
export class PsychologistListComponent implements OnInit {
  statusId: number = 2;
  psychologists: PsychologistNew[];
  psychologistStatuses: PsychologistStatus[];

  constructor(private psychoService: PsychoService) {
  }

  ngOnInit() {
    this.getPsychsByStatus(this.statusId);

    this.psychoService.getStatuses().subscribe(data => {
      this.psychologistStatuses = data;
    }, error => {
      console.error(JSON.stringify(error));
    });
  }

  private getPsychsByStatus(statusId: number) {
    this.psychoService.getByStatus(statusId).subscribe(data => {
      this.psychologists = data;
    }, error => {
      console.error(JSON.stringify(error));
    });
  }

  onPsychStatusChange(selectedId: string) {
    this.getPsychsByStatus(parseInt(selectedId));
  }
}
