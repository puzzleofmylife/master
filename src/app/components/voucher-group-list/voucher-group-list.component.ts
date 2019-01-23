import { Component, OnInit } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { VoucherGroup } from './../../models/VoucherGroup';


@Component({
	selector: 'app-voucher-group-list',
	templateUrl: './voucher-group-list.component.html',
	styleUrls: ['./voucher-group-list.component.css']
})
export class VoucherGroupListComponent implements OnInit {

	voucherGroups: VoucherGroup[] = [];
	loading: boolean = true;
	limit: number = 5;
	page: number = 0;
	moreVoucherGroupsToLoad: boolean;

	constructor(
		private _voucherService: VoucherService,
		private helperService: HelpersService) { }

	ngOnInit() {

		this.getVoucherGroups();
	}

	private getVoucherGroups(): void {
		this.page++;
		this.loading = true;

		this._voucherService.getVoucherGroups(this.limit, this.page).subscribe(response => {
			this.loading = false;
			this.voucherGroups.push(...response);

			if (response.length == this.limit) {
				this.moreVoucherGroupsToLoad = true;
			} else {
				this.moreVoucherGroupsToLoad = false;
			}
		}, error => {
			this.loading = false;
			console.error(JSON.stringify(error));
		});
	}

	loadMoreVoucherGroups() {
		this.getVoucherGroups();
	}

	getVoucherGroupStatusClass(statusKey: boolean) {
		return this.helperService.getVoucherGroupStatusClass(statusKey);
	}

	disableVoucherGroup(voucherGroupId: number) {
		this._voucherService.disable(voucherGroupId).subscribe(response => {
			this.voucherGroups[this.voucherGroups.indexOf(this.voucherGroups.find(x => x.id === voucherGroupId))] = response;
		}, error => {
			console.error(JSON.stringify(error));
		})
	}

	enableVoucherGroup(voucherGroupId: number) {
		this._voucherService.enable(voucherGroupId).subscribe(response => {
			this.voucherGroups[this.voucherGroups.indexOf(this.voucherGroups.find(x => x.id === voucherGroupId))] = response;
		}, error => {
			console.error(JSON.stringify(error));
		})
	}

}
