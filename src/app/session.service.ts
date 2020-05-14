import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Session } from './session';
import { UsersService } from './users.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionsUrl = 'http://localhost:8080/auth';
  private currentSession = new Subject<Session>();
  private nullSession: Session = null;

  constructor(
    private notificationsService: NotificationsService,
	private usersService: UsersService,
	private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<Session> {
	return this.http.get<Session>(this.sessionsUrl).pipe(
	  tap(res => {
		this.usersService.getUser(username).subscribe(user => {
		  this.currentSession.next({
		    tokenString: res.token,
			user
		  });
		});
		this.notificationsService.push(`Logged in as ${username}.`);
	  }),
	  catchError(_ => {
	    this.currentSession.next(this.nullSession);
		this.notificationsService.push('Login failed.');
	  })
	);
  }

  logout(): Observable<Session> {
	this.notificationsService.push('You are now logged out.');
    this.currentSession.next(this.nullSession);
	return of(this.nullSession);
  }

  getCurrentSession(): Observable<Session> { return this.currentSession; }
}
