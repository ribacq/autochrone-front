import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { UsersService } from '../users.service';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];

  constructor(
	private usersService: UsersService,
	private titleService: TitleService
  ) { }

  ngOnInit(): void {
	this.getUsers();
	this.titleService.setTitle('Users');
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(users => this.users = users);
  }
}
