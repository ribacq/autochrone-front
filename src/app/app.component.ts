import { Component, OnInit } from '@angular/core';

import { TitleService } from './title.service';
import { UsersService } from './users.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  currentUser: User;

  public constructor(
    private titleService: TitleService,
	private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle();
	this.title = this.titleService.title;
	this.usersService.getCurrentUser().subscribe(
	  user => this.currentUser = user
	);
  }

  logout(): void {
    this.usersService.logout().subscribe();
  }
}
