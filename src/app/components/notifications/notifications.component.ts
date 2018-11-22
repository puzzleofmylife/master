import { Component, OnInit, OnDestroy } from '@angular/core';
import { HelpersService } from '../../services/helpers.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
	selector: 'app-notifications',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.css']
})


export class NotificationsComponent implements OnInit, OnDestroy {

	currentNotifications: any[];
	newNotificationCount: number;
	notificationLimit: number = 10;
	showNotificationDropdown: boolean = false;
	newNotificationsSubscription: Subscription;
	newNotificationGetInterval: number = 60 * 1000;

	constructor(private helpersService: HelpersService, private notificationService: NotificationService, private router: Router) { }

	ngOnInit() {
		this.getNewNotifications();
		this.newNotificationsSubscription = TimerObservable.create(this.newNotificationGetInterval, this.newNotificationGetInterval)
			.subscribe(() => {
			this.getNewNotifications();
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

		if (!this.showNotificationDropdown) {
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

	ngOnDestroy() {
		/* We need to unsubscribe, otherwise the getting of new notifications will continue
		*  even if we navigate away from this component
		*/
		if (this.newNotificationsSubscription)
			this.newNotificationsSubscription.unsubscribe();
	}
}
