import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Sprint } from '../sprint';
import { SprintsService } from '../sprints.service';
import { SessionService } from '../session.service';
import { ProjectsService } from '../projects.service';
import { Project } from '../project';
import { User } from '../user';

@Component({
  selector: 'app-join-sprint-with-invite',
  templateUrl: './join-sprint-with-invite.component.html',
  styleUrls: ['./join-sprint-with-invite.component.css']
})
export class JoinSprintWithInviteComponent implements OnInit {
  currentUser: User;
  projects: Project[];
  islug: string;

  constructor(
    private route: ActivatedRoute,
	private router: Router,
	private sprintsService: SprintsService,
	private sessionService: SessionService,
	private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
	this.route.paramMap.subscribe(pm => {
	  this.islug = pm.get('islug');
	});
	this.sessionService.getCurrentSession().subscribe(session => {
	  this.currentUser = session.user;
	  this.projectsService.getProjectsByUsername(this.currentUser.username).subscribe(res => this.projects = res);
	});
  }

  joinWithProject(project: Project): void {
	this.sprintsService.newGuestSprint(this.currentUser.username, project.slug, this.islug).subscribe(sprint => {
	  this.router.navigate(['u', sprint.username, sprint.pslug, 'sprint', sprint.slug]);
	});
  }
}
