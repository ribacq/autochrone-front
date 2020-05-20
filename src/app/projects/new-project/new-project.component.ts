import { Component, OnInit } from '@angular/core';

import { Project } from '../../project';
import { User } from '../../user';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  currentUser: User;
  project: Project;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
	this.sessionService.getCurrentSession().subscribe(session => {
	  this.currentUser = session.user;
	  this.project = new Project();
	  this.project.userId = this.currentUser.id;
	});
  }

}
