import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Notification } from 'src/app/models/Notification';
import { PushService } from 'src/app/services/push.service';


@Component({
	selector: 'app-notification-nav',
	templateUrl: './notification-nav.component.html',
	styleUrls: ['./notification-nav.component.css']
})


export class NotificationNavComponent implements OnInit {

	currentNotifications: Notification[];
	newNotificationCount: number;
	notificationLimit: number = 10;
	showNotificationDropdown: boolean = false;
	newNotificationsSubscription: Subscription;

	get isMobile(): boolean {
		return window.innerWidth <= 480;
	}

	constructor(
		private helpersService: HelpersService,
		private notificationService: NotificationService,
		private router: Router,
		private pushService: PushService) { }

	ngOnInit() {
		this.getNewNotifications();

		this.pushService.getNotifications().subscribe(response => {
			this.currentNotifications.unshift(response);
			this.newNotificationCount++;
		}, error => {
			console.error(JSON.stringify(error));
		});
	}
	getNewNotifications(): any {
		this.notificationService.getNewNotificationCount().subscribe(response => {
			this.newNotificationCount = response.count;

		}, error => {
			console.error(JSON.stringify(error));
		});

		this.notificationService.getNotifications(this.notificationLimit, 0).subscribe(response => {
			this.currentNotifications = response;
		}, error => {
			console.error(JSON.stringify(error));
		});
	}

	onOpenCloseNotificationDropDown(): void {
		this.showNotificationDropdown = !this.showNotificationDropdown;

		//if closing the notifications dropdown and notifications exist mark them as read
		if (!this.showNotificationDropdown && this.currentNotifications && this.currentNotifications.length > 0) {
			this.notificationService.markNotificationAsRead().subscribe(x => {
				this.markNotificationsRead();
				this.resetNewNotificationCount();
			});
		}
	}

	markNotificationsRead(): void {
		this.currentNotifications.forEach(notification => {
			notification.read = true;
		});
	}

	resetNewNotificationCount(): void {
		this.newNotificationCount = 0;
	}

	convertToLocalDate(utcDate: Date): Date {
		return moment.utc(utcDate).local().toDate();
	}

	navToNotifications() {
		this.onOpenCloseNotificationDropDown();
		this.router.navigate(['/notifications']);
	}
}
