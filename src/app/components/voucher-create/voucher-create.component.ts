import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Package } from 'src/app/models/Package';
import { VoucherGroup } from 'src/app/models/VoucherGroup';
import { PackageService } from 'src/app/services/package.service';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
	selector: 'app-voucher-create',
	templateUrl: './voucher-create.component.html',
	styleUrls: ['./voucher-create.component.css']
})
export class VoucherCreateComponent implements OnInit {

	@ViewChild('yearSelect') yearSelect: ElementRef
	@ViewChild('monthSelect') monthSelect: ElementRef

	voucherGroupForm: FormGroup;
	packageTypes: Package[];
	years: number[] = [];
	days: number[] = [];
	selectedPackageTypeId: number;
	voucherGroup: VoucherGroup = new VoucherGroup();

	submitted: boolean;
	saving: boolean;

	constructor(
		private _packageService: PackageService,
		private _voucherService: VoucherService,
		private _formbuilder: FormBuilder,
		private _router: Router
	) { }

	ngOnInit() {
		this.createVoucherGroupForm();

		this._packageService.getActivePackages().subscribe(response => {
			this.packageTypes = response;
		}, error => {
			console.error(JSON.stringify(error));
		});

		this.getYears();
	}
	createVoucherGroupForm(): void {
		this.voucherGroupForm = this._formbuilder.group({
			voucherGroupName: ['', Validators.required],
			noOfVouchersToGenerate: ['', [Validators.required, Validators.max(100000)]],
			packageType: ['', Validators.required],
			expiryDay: ['', Validators.required],
			expiryMonth: ['', Validators.required],
			expiryYear: ['', Validators.required]
		});
	}

	createVoucherGroup(): void {
		this.submitted = true;
		if (this.voucherGroupForm.valid) {
			this.saving = true;
			this.voucherGroup.name = this.voucherGroupForm.controls.voucherGroupName.value;
			this.voucherGroup.numberOfVouchers = this.voucherGroupForm.controls.noOfVouchersToGenerate.value;
			this.voucherGroup.packageId = this.voucherGroupForm.controls.packageType.value;
			this.voucherGroup.expiryDate = this.createDate();

			this._voucherService.create(this.voucherGroup).subscribe(() => {
				this.saving = false;
				this._router.navigate(['/admin/vouchers']);
			}, error => {
				this.saving = false;
				console.error(JSON.stringify(error));
			});

			console.log(this.voucherGroup);
		}
	}

	createDate(): Date {
		let dateExpiryDay: any = this.voucherGroupForm.controls.expiryDay.value;
		let dateExpiryMonth: any = this.voucherGroupForm.controls.expiryMonth.value;
		let dateExpiryYear: any = this.voucherGroupForm.controls.expiryYear.value;
		let resultDate = new Date(Date.UTC(parseInt(dateExpiryYear), parseInt(dateExpiryMonth) - 1, parseInt(dateExpiryDay)));
		return resultDate;
	}


	getYears() {
		var yearsToGet = 10;
		var currentYear = new Date().getFullYear();
		var endYear = currentYear + yearsToGet;
		for (let index = currentYear; index < endYear; index++) {
			this.years.push(index);
		}
	}

	setDays() {
		var selectedMonth = this.monthSelect.nativeElement.value;
		var selectedYear = this.yearSelect.nativeElement.value;
		if (!selectedMonth || !selectedYear) {
			this.days = [];
			return;
		}

		var daysInMonth = new Date(parseInt(selectedYear), parseInt(selectedMonth), 0).getDate();
		this.days = [];
		for (let day = 1; day <= daysInMonth; day++) {
			this.days.push(day);
		}
	}
}
