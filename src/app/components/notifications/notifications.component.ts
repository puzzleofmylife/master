import { Component, OnInit } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  currentNotifications: any[];
  newNotificationCount: number;
  notificationLimit: number = 10;
  createTime: Date;

  constructor(private helpersService: HelpersService, private notifcationService: NotificationService) { }

  ngOnInit() {

    this.notifcationService.getNewNotificationCount().subscribe(response => {
      this.newNotificationCount = response.count;
    }, error => {
      console.error(JSON.stringify(error));
    });

    this.notifcationService.getNotifications(this.notificationLimit, 0).subscribe(response => {
      this.currentNotifications = [response];
    }, error =>{
      console.error(JSON.stringify(error));
    });

    this.createTime = new Date();
  }

  getTimeSinceDate(){
    if (this.newNotificationCount > 0)
      this.createTime = new Date();
  }

}
