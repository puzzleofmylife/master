import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Toast } from 'src/app/models/Toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toast: Toast;
  showToast: boolean;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.get().subscribe(resp => {
      if (resp)
        this.dispToast(resp);
    });
  }

  dispToast(toast: Toast): any {
    this.toast = toast;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  getStateClass() {
    var stateClass = 'slds-notify slds-notify_toast ';
    switch (this.toast.state) {
      case 'success':
        stateClass += 'slds-theme_success';
        break;
      case 'error':
        stateClass += 'slds-theme_error';
        break;
      case 'warning':
        stateClass += 'slds-theme_warning';
        break;
      default:
        stateClass += 'slds-theme_info';
        break;
    }

    return stateClass;
  }

}
