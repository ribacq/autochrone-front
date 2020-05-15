import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { UsersService } from '../users.service';
import { SessionService } from '../session.service';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  currentUser: User;

  constructor(
    private usersService: UsersService,
	private titleService: TitleService,
	private sessionService: SessionService,
	private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
	this.getUser();
	this.sessionService.getCurrentSession().subscribe(session => {
      this.currentUser = session.user;
	});
  }

  get isMe(): boolean { return !!this.currentUser && this.currentUser.username === this.user.username; }

  private getUser(): void {
    this.route.paramMap.subscribe(pm => {
	  this.usersService.getUser(pm.get('username')).subscribe(user => {
		this.user = user;
		this.titleService.setTitle(user.username);
	  });
    });
  }
}
