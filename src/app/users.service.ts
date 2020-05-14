import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'http://localhost:8080/users';
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
}
