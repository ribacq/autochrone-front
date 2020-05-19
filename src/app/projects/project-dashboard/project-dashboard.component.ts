import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../user';
import { UsersService } from '../../users.service';
import { Project, DateSprints } from '../../project';
import { ProjectsService } from '../../projects.service';
import { SessionService } from '../../session.service';
import { Sprint } from '../../sprint';
import { SprintsService } from '../../sprints.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit {
  currentUser: User;
  user: User;
  project: Project;

  constructor(
	private usersService: UsersService,
    private projectsService: ProjectsService,
	private sessionService: SessionService,
    private sprintsService: SprintsService,
	private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
	  this.usersService.getUserByUsername(pm.get('username')).subscribe(user => this.user = user);
	  this.projectsService.getProjectByUsernameAndSlug(pm.get('username'), pm.get('slug')).subscribe(project => {
	    this.project = project;
	  });
	});
	this.sessionService.getCurrentSession().subscribe(session => this.currentUser = session.user);
  }

}
