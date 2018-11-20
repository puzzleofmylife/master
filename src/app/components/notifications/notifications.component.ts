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
	showNotificationDropdown: boolean = false;
	notification: boolean = false;

	constructor(private helpersService: HelpersService, private notificationService: NotificationService) { }

	ngOnInit() {

		this.notificationService.getNewNotificationCount().subscribe(response => {
			this.newNotificationCount = response.count;
		}, error => {
			console.error(JSON.stringify(error));
		});

		this.notificationService.getNotifications(this.notificationLimit, 0).subscribe(response => {
			this.currentNotifications = response
		}, error => {
			console.error(JSON.stringify(error));
		});

		this.createTime = new Date();
	}

	onCloseNotificationsDropDown(): boolean {
		this.notificationService.markNotificationAsRead().subscribe(x => {
			this.markNotificationsRead();
			this.resetNewNotificationCount();
		});
		return this.showNotificationDropdown = false;
	}

	markNotificationsRead(): void {
		this.currentNotifications.forEach(notification => {
			notification.read = true;
		});
	}

	resetNewNotificationCount(): number {
		return this.newNotificationCount = 0;
	}
}
