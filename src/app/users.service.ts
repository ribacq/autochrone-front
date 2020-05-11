import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'http://localhost:8080/users';

  private currentUser = new Subject<User>();
  private nullUser: User = null;
  
  constructor(
	private http: HttpClient,
	private notificationsService: NotificationsService
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${username}`);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${username}`).pipe(
	  tap(user => {
	    this.currentUser.next(user);
		this.notificationsService.clear();
		this.notificationsService.push(`${user.username} is back!`);
	  }),
	  catchError(_ => {
	    this.notificationsService.push('Login failed');
		return of(this.nullUser);
	  })
	);
  }

  logout(): Observable<User> {
	this.currentUser.next(null);
	this.notificationsService.clear();
	this.notificationsService.push('You are now logged out.');
	return of(null);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }
}
