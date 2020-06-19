import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Session } from './session';
import { UsersService } from './users.service';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionsUrl = 'http://192.168.1.42:8080/auth';
  private nullSession: Session = {token: '', user: null};
  private currentSession = new BehaviorSubject<Session>(this.nullSession);

  constructor(
    private notificationsService: NotificationsService,
	private usersService: UsersService,
	private http: HttpClient,
	private router: Router
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
	  this.usersService.getUserByUsername(username).subscribe(user => {
	    this.currentSession.next({
		  token: res.token,
		  user
		});
		this.notificationsService.push(`Logged in as ${username}.`);
		this.router.navigate(['/u', username]);
	  });
	});
	return this.currentSession;
  }

  logout(): Observable<Session> {
	this.notificationsService.push('You are now logged out.');
    this.currentSession.next(this.nullSession);
	this.router.navigate(['/']);
	return this.currentSession;
  }

  getCurrentSession(): Observable<Session> { return this.currentSession.asObservable(); }
}
