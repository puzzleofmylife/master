import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Package } from '../models/Package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }

  getActivePackages(): Observable<Package[]> {
    return this.http.get<Package[]>(environment.baseAPIURL + '/api/Package/active');
  }

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(environment.baseAPIURL + '/api/Package');
  }

  disable(packageId: number): Observable<Package> {
    return this.http.post<Package>(environment.baseAPIURL + '/api/Package/disable/' + packageId, null);
  }

  enable(packageId: number): Observable<Package> {
    return this.http.post<Package>(environment.baseAPIURL + '/api/Package/enable/' + packageId, null);
  }
}
