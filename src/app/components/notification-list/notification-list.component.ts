import { Component, OnInit, Input } from '@angular/core';
import { HelpersService } from 'src/app/services/helpers.service';
import { Notification } from 'src/app/models/Notification';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  @Input() notifications: Notification[];

  constructor(private helpersService: HelpersService) { }

  ngOnInit() {
  }

}
