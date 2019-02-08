export class VoucherGroup {
	id:number;
	name: string;
	packageId: number;
	packageName: string;
	expiryDate: Date;
	numberOfVouchers: number;
	numberOfVouchersUsed: number;
	enabled: boolean;
	discountPeriods: number;
    discountPercent: number;
    freePeriods: number;
}
