import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { PsychoService } from 'src/app/services/psycho.service';
import { CancelReason } from '../../models/CancelReason';

@Component({
  selector: 'app-cancel-reason',
  templateUrl: './cancel-reason.component.html',
  styleUrls: ['./cancel-reason.component.css']
})
export class CancelReasonComponent implements OnInit {
  cancelReasons: CancelReason[] = [];
  loading: boolean;
  limit: number = 30;
  page: number = 0;
  loadMore: boolean;

  constructor(private patientService: PatientService, private psychoService: PsychoService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.page++;
    this.loading = true;

    this.patientService.getCancelReasons(this.limit, this.page).subscribe(result => {
      this.loading = false;

      this.cancelReasons.push(...result);
      if (result.length == this.limit) {
        this.loadMore = true;
      } else {
        this.loadMore = false;
      }
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error));
    });
  }

}
