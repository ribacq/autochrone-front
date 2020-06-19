import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { NotificationsService } from './notifications.service';
import { API } from './api.const';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = API.url + 'users/';
  private nullUser: User = null;
  
  constructor(
	private http: HttpClient,
	private notificationsService: NotificationsService
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + username);
  }
}
