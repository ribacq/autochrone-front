import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../project';
import { User } from '../../user';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  @Input('user') user: User;
  currentUser: User;

  constructor(
	private sessionService: SessionService
  ) { }

  ngOnInit(): void {
	this.sessionService.getCurrentSession().subscribe(session => this.currentUser = session.user);
  }
}
