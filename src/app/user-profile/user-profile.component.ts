import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor(
    private usersService: UsersService,
	private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
	this.getUser();
  }

  getUser(): void {
    this.usersService.getUser(this.route.snapshot.paramMap.get('username'))
	  .subscribe(user => this.user = user);
  }
}
