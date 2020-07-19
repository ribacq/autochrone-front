import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Session } from './session';
import { UsersService } from './users.service';
import { NotificationsService } from './notifications.service';
import { LocalStorageService } from './local-storage.service';
import { API } from './api.const';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private sessionsUrl = API.url + 'auth/';
  private nullSession: Session = {token: '', user: null};

  constructor(
    private notificationsService: NotificationsService,
	private usersService: UsersService,
	private localStorageService: LocalStorageService,
	private http: HttpClient,
	private router: Router
  ) { }

  login(username: string, password: string): Observable<Session> {
	return this.http.post<{token: string}>(this.sessionsUrl, {username, password}).pipe(
      catchError((err, caught) => {
	    this.notificationsService.push('Login failed.');
		this.localStorageService.removeSession();
		return of(null);
	  }),
	  map(res => {
	    if (res === null) { return this.nullSession; }
		this.usersService.getUserByUsername(username).subscribe(user => {
		  this.localStorageService.setSession({
		    token: res.token,
		    user
		  });
		  this.notificationsService.push(`Logged in as ${username}.`);
		  this.router.navigate(['/u', username]);
	    });
	    return this.localStorageService.getSession();
	  })
	);
  }

  logout(): Observable<Session> {
	this.notificationsService.push('You are now logged out.');
    this.localStorageService.removeSession();
	this.router.navigate(['/']);
	return of(this.localStorageService.getSession());
  }

  getCurrentSession(): Observable<Session> { return of(this.localStorageService.getSession()); }
}
