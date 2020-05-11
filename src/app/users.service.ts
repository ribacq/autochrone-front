import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'http://localhost:8080/users';

  private currentUser = new Subject<User>();
  
  constructor(
	private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${username}`);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${username}`).pipe(
	  tap(user => this.currentUser.next(user))
	);
  }

  logout(): Observable<User> {
	this.currentUser.next(null);
	return of(null);
  }

  getCurrentUser(): Observable<User> {
    return this.currentUser;
  }
}
