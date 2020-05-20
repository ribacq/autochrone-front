import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from '../../project';
import { User } from '../../user';
import { SessionService } from '../../session.service';
import { ProjectsService } from '../../projects.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {
  currentUser: User;
  project: Project;

  constructor(
	private router: Router,
	private projectsService: ProjectsService,
	private notificationsService: NotificationsService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
	this.sessionService.getCurrentSession().subscribe(session => {
	  this.currentUser = session.user;
	  this.project = new Project();
	  this.project.userId = this.currentUser.id;
	});
  }

  postProject(newProject: Project): void {
	this.projectsService.postProject(this.currentUser.username, newProject).subscribe({
	  next: res => {
		this.notificationsService.push('A new project has been created!');
		this.router.navigate(['/u/', this.currentUser.username, newProject.slug]);
	  },
	  error: err => {
	    this.notificationsService.push('Sorry, we were unable to create this project.');
	  }
	});
  }
}
