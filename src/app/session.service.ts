import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  private nullSession: Session = {token: '', user: null};

  constructor(
    private notificationsService: NotificationsService,
	private usersService: UsersService,
	private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<Session> {
	this.http.post<{token: string}>(this.sessionsUrl, {username, password}).pipe(
      catchError((err, caught) => {
	    this.notificationsService.push('Login failed.');
		this.currentSession.next(this.nullSession);
		return of(null);
	  })
	).subscribe(res => {
	  if (res === null) { return; }
	  this.usersService.getUser(username).subscribe(user => {
	    this.currentSession.next({
		  token: res.token,
		  user
		});
		this.notificationsService.push(`Logged in as ${username}.`);
	  });
	});
	return this.currentSession;
  }

  logout(): Observable<Session> {
	this.notificationsService.push('You are now logged out.');
    this.currentSession.next(this.nullSession);
	return this.currentSession;
  }

  getCurrentSession(): Observable<Session> { return this.currentSession; }
}
