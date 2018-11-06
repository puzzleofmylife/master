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
  statusId: number = 1;
  psychologists: PsychologistNew[];
  psychologistStatuses: PsychologistStatus[];

  constructor(private psychoService: PsychoService) {
  }

  ngOnInit() {
    this.psychoService.getStatuses().subscribe(data => {
      this.psychologistStatuses = data;
      this.getPsychsByStatus(this.statusId);
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

  getStatusClass(statusName: string) {
    var statusId = this.psychologistStatuses.filter(x => x.name == statusName).map(x => x.id)[0];

    switch (statusId) {
      case 1:
        return 'pending_approval';
        break;
      case 2:
        return 'active';
        break;
    }
  }
}
