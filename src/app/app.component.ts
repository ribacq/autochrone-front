import { Component, OnInit } from '@angular/core';

import { TitleService } from './title.service';
import { SessionService } from './session.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string;
  currentUser: User;

  constructor(
    private titleService: TitleService,
	private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle();
	this.title = this.titleService.title;
	this.sessionService.getCurrentSession().subscribe(session => {
      this.currentUser = session.user;
	});
  }

  logout(): void {
    this.sessionService.logout().subscribe();
  }
}
