import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Notification } from '../notification';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.notificationsService.getHandle().subscribe(
	  notifications => this.notifications = notifications
	);
  }

  clear(): void {
    this.notificationsService.clear();
  }
}
