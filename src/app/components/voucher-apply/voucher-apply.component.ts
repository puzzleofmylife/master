import { Component, OnInit } from '@angular/core';
import { VoucherService } from 'src/app/services/voucher.service';
import { VoucherInfo } from 'src/app/models/VoucherInfo';
import { PatientService } from 'src/app/services/patient.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-voucher-apply',
  templateUrl: './voucher-apply.component.html',
  styleUrls: ['./voucher-apply.component.css']
})
export class VoucherApplyComponent implements OnInit {
  cmpState: string = "init";
  voucherCode: string;
  voucherInfo: VoucherInfo;
  voucherCodeValid: boolean;
  loading: boolean;

  constructor(
    private voucherService: VoucherService, 
    private patientService: PatientService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.loading = true;
    this.patientService.getCurrentPatientPackage().subscribe(curPackage => {
      if(curPackage.packageVoucher)
        this.cmpState = "voucher_warning";

        this.loading = false;
    }, error => {
      this.loading = false;
      this.toastService.setError("An error occurred");
      console.error('Could not load patient current package: ' + JSON.stringify(error.error));
    });
  }

  getVoucherInfo() {
    this.loading = true;
    this.voucherService.get(this.voucherCode).subscribe(resp => {
      this.cmpState = "voucher_info";
      this.voucherInfo = resp;
      this.loading = false;
    }, error => {
      this.loading = false;

      if(error.error.InvalidVoucherCode)
        this.cmpState = "invalid_voucher";
      else
        this.toastService.setError("An error occurred");
    });
  }

  confirmApplyVoucher(){
    this.loading = true;
    this.patientService.applyVoucher(this.voucherCode).subscribe(resp => {
      this.loading = false;
      this.cmpState = "voucher_success";
    }, error => {
      this.loading = false;
      this.toastService.setError("An error occurred");
    });
  }

}
