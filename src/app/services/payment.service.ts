import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  createCheckout(amount): Observable<string> {
    return this.http.get<string>(environment.baseAPIURL + '/api/Payment/checkout', { params: new HttpParams().set('amount', amount.toString()) });
  }
}
