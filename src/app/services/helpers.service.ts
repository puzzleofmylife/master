import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  getPsychStatusClass(statusId: number) {
    switch (statusId) {
      case 1:
        return 'pending_approval';
        break;
      case 2:
        return 'active';
        break;
      case 3:
        return 'denied';
        break;
    }
  }
}
