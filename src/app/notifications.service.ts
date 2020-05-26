import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';

import { Notification } from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notifications: Notification[] = [];
  private handle = new Subject<Notification[]>();
  
  constructor() { }

  push(message: string, duration: number = 5000): Observable<Notification> {
    let notification = {
	  date: new Date(),
	  duration: duration,
	  message: message
	};
    this.notifications.push(notification);
	setTimeout(notification => {
	  this.notifications.splice(this.notifications.indexOf(notification), 1);
	  this.handle.next(this.notifications);
	}, notification.duration, notification);
	this.handle.next(this.notifications);
	return of(notification);
  }

  clear(): void {
    this.notifications = [];
	this.handle.next(this.notifications);
  }

  getHandle(): Observable<Notification[]> {
	return this.handle;
  }
}
