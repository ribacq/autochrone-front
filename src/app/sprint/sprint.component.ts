import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from 'luxon';

import { Sprint } from '../sprint';
import { SprintsService } from '../sprints.service';
import { Project } from '../project';
import { ProjectsService } from '../projects.service';
import { User } from '../user';
import { UsersService } from '../users.service';
import { SessionService } from '../session.service';
import { NotificationsService } from '../notifications.service';

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
  now: DateTime;
  alarmSound = new Audio('/assets/lartti-ding.ogg');

  overForm = new FormGroup({
	wordCount: new FormControl('', [Validators.required]),
	isMilestone: new FormControl(''),
	comment: new FormControl(''),
	continuePomodoro: new FormControl('')
  });

  constructor(
    private route: ActivatedRoute,
	private router: Router,
	private notificationsService: NotificationsService,
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
	  this.sprintsService.getSprintByUsernamePslugSslug(pm.get('username'), pm.get('pslug'), pm.get('sslug')).subscribe(sprint => {
	    this.sprint = sprint;
		if (!this.sprint.over) {
		  let clockForSprint = setInterval(_ => this.now = DateTime.local(), 1000);
		  if (this.sprint.upcoming) {
			setTimeout(_ => this.alarmSound.play(), +(this.sprint.untilStart(DateTime.local())));
		  }
		  setTimeout(_ => {
			clearInterval(clockForSprint);
			this.alarmSound.play();
		  }, +(this.sprint.untilEnd(DateTime.local())) + 500);
		}
		this.overForm.patchValue({
		  wordCount: this.sprint.wordCount,
		  isMilestone: this.sprint.isMilestone,
		  comment: this.sprint.comment,
		  continuePomodoro: !this.sprint.isSingleSprint
		});
	  });
	});
  }

  onOverFormSubmit(): void {
	if (this.overForm.invalid) {
	  return;
	}

	this.sprint.wordCount = this.overForm.get('wordCount').value as number;
	this.sprint.isMilestone = this.overForm.get('isMilestone').value as boolean;
	this.sprint.comment = this.overForm.get('comment').value as string;

	this.sprintsService.updateSprint(this.user.username, this.project.slug, this.sprint).subscribe({
	  next: _ => {
		this.notificationsService.push('Sprint saved!');
		// if sprint is single or user wants to leave, go back to project
		if (this.sprint.isSingleSprint || !(this.overForm.get('continuePomodoro').value as boolean)) {
		  this.router.navigate(['u', this.user.username, this.project.slug]);
		} else {
		  // if sprint is not single, try to load the next one
		  this.sprintsService.nextSprint(this.user.username, this.project.slug, this.sprint).subscribe({
		    next: nextSprint => {
			  this.notificationsService.push('Loading next sprint!');
			  this.router.navigate(['u', this.user.username, this.project.slug, 'sprint', nextSprint.slug]);
			},
			error: _ => {
			  this.notificationsService.push('Could not load next sprint.');
			  this.router.navigate(['u', this.user.username, this.project.slug]);
			}
		  });
		}
	  },
	  error: err => {
		this.notificationsService.push('Sorry, we could not save your sprint, please try again.');
	  }
	});
  }

  openToGuests(): void {
	if (this.sprint.over) {
	  this.notificationsService.push('This sprint is already over, you cannot invite anyone.');
	  return;
	}
	
	let inviteComment = 'Hello, world!';
	this.sprintsService.openSprintToGuests(this.user.username, this.project.slug, this.sprint, inviteComment).subscribe({
	  next: res => {
		console.log(res);
		this.sprint.inviteSlug = res.inviteSlug;
		this.sprint.inviteComment = inviteComment;
	    this.notificationsService.push('Your sprint is now open to guests!');
	  },
	  error: err => {
		console.log(err);
		this.notificationsService.push('Sorry, an error has occured, please try again.');
	  }
	});
  }
}
