import { VoucherGroup } from 'src/app/models/VoucherGroup';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
	selector: 'app-vouchers',
	templateUrl: './vouchers.component.html',
	styleUrls: ['./vouchers.component.css']
})
export class VouchersComponent implements OnInit {

	vouchers: any = [];
	limit: number = 100;
	page: number = 0;
	loading = true;
	voucherGroupName: string;
	moreVouchersToLoad: boolean;

	constructor(
		private _voucherService: VoucherService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.voucherGroupName = this.route.snapshot.paramMap.get('voucherGroupName');
		this.getVouchers();
	}

	private getVouchers(): void {
		this.loading = true;
		this.page++;
		const voucherGroupId = +this.route.snapshot.paramMap.get('id');
		this._voucherService.getVouchers(voucherGroupId, this.limit, this.page).subscribe(response => {
			this.loading = false;
			this.vouchers.push(...response);
			if (response.length == this.limit) {
				this.moreVouchersToLoad = true;
			}
			else{
				this.moreVouchersToLoad = false;
			}
		}, error => {
			this.loading = false;
			console.error(JSON.stringify(error));
		});
	}

	loadMoreVouchers() {
		this.getVouchers();
	}
}
