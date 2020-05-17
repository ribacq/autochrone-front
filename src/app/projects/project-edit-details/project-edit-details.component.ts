import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Project } from '../../project';
import { ProjectsService } from '../../projects.service';
import { User } from '../../user';
import { UsersService } from '../../users.service';
import { SessionService } from '../../session.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-project-edit-details',
  templateUrl: './project-edit-details.component.html',
  styleUrls: ['./project-edit-details.component.css']
})
export class ProjectEditDetailsComponent implements OnInit {
  project: Project;
  user: User;
  currentUser: User;

  projectDetailsForm = new FormGroup({
	name: new FormControl('', [Validators.required]),
	dateStart: new FormControl('', [Validators.required]),
	dateEnd: new FormControl('', [Validators.required]),
	wordCountStart: new FormControl('', [Validators.required]),
	wordCountGoal: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
	private router: Router,
	private usersService: UsersService,
	private projectsService: ProjectsService,
	private sessionService: SessionService,
	private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
	  this.usersService.getUserByUsername(pm.get('username')).subscribe(user => this.user = user);
	  this.projectsService.getProjectByUsernameAndSlug(pm.get('username'), pm.get('slug')).subscribe(project => {
		this.project = project;
		this.projectDetailsForm.patchValue(project);
	  });
	});
	this.sessionService.getCurrentSession().subscribe(session => this.currentUser = session.user);
  }

  onSubmit(): void {
	if (this.projectDetailsForm.valid) {
	  this.notificationsService.push('Project ' + this.projectDetailsForm.get('name').value + ' updated.');
	  this.router.navigate(['/u/', this.user.username, this.project.slug]);
	}
  }
}
