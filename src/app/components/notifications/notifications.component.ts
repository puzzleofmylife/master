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
	newNoficationCount: number;
	notificationLimit: number = 10;
	createTime: Date;
	showNotificationDropdown: boolean = false;
	closeWindow: boolean = false;

	constructor(private helpersService: HelpersService, private notificationService: NotificationService) { }

	ngOnInit() {

		this.notificationService.getNewNotificationCount().subscribe(response => {
			this.newNoficationCount = response.count;
		}, error => {
			console.error(JSON.stringify(error));
		});

		this.notificationService.getNotifications(this.notificationLimit, 0).subscribe(response => {
			this.currentNotifications = response;
		}, error => {
			console.error(JSON.stringify(error));
		});

		this.createTime = new Date();
	}

	getTimeSinceDate(): Date {
		if (this.newNoficationCount > 0) {
			return this.createTime = new Date();
		}

	}

	onDropDownClose(){
		this.showNotificationDropdown = false;
	}

}
