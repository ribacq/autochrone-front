import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Sprint } from '../sprint';
import { SprintsService } from '../sprints.service';
import { Project } from '../project';
import { ProjectsService } from '../projects.service';
import { User } from '../user';
import { UsersService } from '../users.service';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  currentUser: User;
  user: User;
  project: Project;
  sprint: Sprint;

  constructor(
    private route: ActivatedRoute,
	private sprintsService: SprintsService,
	private projectsService: ProjectsService,
	private usersService: UsersService,
	private sessionService: SessionService
  ) { }

  ngOnInit(): void {
	this.sessionService.getCurrentSession().subscribe(session => this.currentUser = session.user);
    this.route.paramMap.subscribe(pm => {
	  this.usersService.getUserByUsername(pm.get('username')).subscribe(user => this.user = user);
	  this.projectsService.getProjectByUsernameAndSlug(pm.get('username'), pm.get('pslug')).subscribe(project => this.project = project);
	  this.sprintsService.getSprintByUsernamePslugSslug(pm.get('username'), pm.get('pslug'), pm.get('sslug')).subscribe(sprint => this.sprint = sprint);
	});
  }
}
