import { Component, OnInit } from '@angular/core';
import { PsychoService } from 'src/app/services/psycho.service';
import { Psychologist } from 'src/app/models/Psychologist';
import { PsychologistStatus } from 'src/app/models/PsychologistStatus';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-psychologist-list',
  templateUrl: './psychologist-list.component.html',
  styleUrls: ['./psychologist-list.component.css']
})
export class PsychologistListComponent implements OnInit {
  statusId: number = 1;
  psychologists: Psychologist[];
  psychologistStatuses: PsychologistStatus[];

  constructor(private psychoService: PsychoService, private helpersService: HelpersService) {
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
}
