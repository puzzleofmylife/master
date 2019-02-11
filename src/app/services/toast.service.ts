import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Toast } from '../models/Toast';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastSubject: BehaviorSubject<Toast> = new BehaviorSubject<Toast>(null);

  constructor() { }

  get(): Observable<Toast> {
    return this.toastSubject.asObservable();
  }

  set(toast: Toast) {
    this.toastSubject.next(toast);
  }

  setError(message: string){
    this.toastSubject.next(new Toast("error", message));
  }

  setSuccess(message: string){
    this.toastSubject.next(new Toast("success", message));
  }

  setWarning(message: string){
    this.toastSubject.next(new Toast("warning", message));
  }
}
