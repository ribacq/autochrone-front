import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from '../../project';
import { User } from '../../user';
import { ProjectsService } from '../../projects.service';
import { UsersService } from '../../users.service';
import { SessionService } from '../../session.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  project: Project;
  user: User;
  currentUser: User;

  constructor(
	private route: ActivatedRoute,
	private router: Router,
	private usersService: UsersService,
	private projectsService: ProjectsService,
    private sessionService: SessionService,
	private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    // from route
    this.route.paramMap.subscribe(pm => {
	  // get user
	  this.usersService.getUserByUsername(pm.get('username')).subscribe(user => this.user = user);
	  // get project
	  this.projectsService.getProjectByUsernameAndSlug(pm.get('username'), pm.get('pslug')).subscribe(project => {
		this.project = new Project(project);
	  });
	});
	// from current session, get current user
	this.sessionService.getCurrentSession().subscribe(session => this.currentUser = session.user);
  }
  
  updateProject(updatedProject: Project): void {
	this.projectsService.putProject(this.currentUser.username, updatedProject).subscribe({
	  next: _ => {
	    this.notificationsService.push('Project updated.');
	    this.router.navigate(['/u/', this.currentUser.username, updatedProject.slug]);
	  },
	  error: err => {
	    console.log(err);
		this.notificationsService.push('Sorry, an error occured on our side, your project was not updated.');
	  }
	});
  }
}
