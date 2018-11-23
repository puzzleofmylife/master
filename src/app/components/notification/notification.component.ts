import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'src/app/models/Notification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
	currentNotifications: Notification[] = [];
	notificationLimit: number = 30;
	page:number = 0;
	noMoreNotifications:boolean = false;
	loading:boolean = true;

	constructor(private notificationService: NotificationService) { }

	ngOnInit() {
		this.loadNotificationsPage();
	}

	loadNotificationsPage(){	
		this.page++;
		this.loading= true;
		this.notificationService.getNotifications(this.notificationLimit,this.page).subscribe(response => {
			this.loading= false;
			this.currentNotifications.push(...response);
			if(response.length == 0){	
             this.noMoreNotifications = true;
			}
		}, error => {
			console.error(JSON.stringify(error));
			this.loading= true;
		});
	}

}
