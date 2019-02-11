import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VoucherGroup } from './../models/VoucherGroup';
import { VoucherInfo } from '../models/VoucherInfo';

@Injectable({
	providedIn: 'root'
})
export class VoucherService {

	constructor(private http: HttpClient) { }

	create(_voucherGroup: VoucherGroup) {
		return this.http.post(environment.baseAPIURL + '/api/Voucher', _voucherGroup);
	}

	getVoucherGroups(limit: number, page: number): Observable<VoucherGroup[]> {
		return this.http.get<VoucherGroup[]>(environment.baseAPIURL + '/api/Voucher/groups',
			{
				params: new HttpParams()
					.set('limit', limit.toString())
					.set('page', page.toString())
			});
	}

	getVouchers(voucherGroupId: number, limit: number, page: number): Observable<any[]> {
		return this.http.get<any[]>(environment.baseAPIURL + '/api/Voucher',
			{
				params: new HttpParams()
					.set('voucherGroupId', voucherGroupId.toString())
					.set('limit', limit.toString())
					.set('page', page.toString())
			});
	}

	disable(voucherGroupId: number): Observable<VoucherGroup> {
		return this.http.post<VoucherGroup>(environment.baseAPIURL + '/api/Voucher/group/disable/' + voucherGroupId, null);
	}

	enable(voucherGroupId: number): Observable<VoucherGroup> {
		return this.http.post<VoucherGroup>(environment.baseAPIURL + '/api/Voucher/group/enable/' + voucherGroupId, null);
	}

	get(voucherCode: string): Observable<VoucherInfo> {
		return this.http.get<VoucherInfo>(environment.baseAPIURL + '/api/Voucher/' + voucherCode);
	}
}
