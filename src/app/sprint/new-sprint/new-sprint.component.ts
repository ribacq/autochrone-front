import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../../project';
import { User } from '../../user';
import { ProjectsService } from '../../projects.service';
import { NotificationsService } from '../../notifications.service';
import { SprintsService } from '../../sprints.service';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.css']
})
export class NewSprintComponent implements OnInit {
  project: Project = undefined;
  username: string = undefined;

  newSprintForm = new FormGroup({
    duration: new FormControl('', [Validators.required]),
	startNow: new FormControl(''),
	timeStartDate: new FormControl(''),
	timeStartTime: new FormControl(''),
	break: new FormControl(''),
	singleSprint: new FormControl('')
  }, {
	validators: [
	  nsf => {
		// require either startNow checked, or timeStartDate and timeStartTime not empty
	    let startNow = nsf.get('startNow');
		let timeStartDate = nsf.get('timeStartDate');
		let timeStartTime = nsf.get('timeStartTime');
		return (!!startNow && startNow.value === true) || (!!timeStartDate && !!timeStartTime && timeStartDate.value !== '' && timeStartTime.value !== '') ? null : { 'invalidStart': true };
	  },
	  nsf => {
	    // required either break value > 0 or single sprint checked
		let breakFC = nsf.get('break');
		let singleSprint = nsf.get('singleSprint');
		return (!!breakFC && +(breakFC.value) > 0) || (!!singleSprint && singleSprint.value === true) ? null : { 'neitherBreakNorSingleSprint': true };
	  }
	]
  });

  constructor(
	private route: ActivatedRoute,
	private router: Router,
    private projectsService: ProjectsService,
	private sprintsService: SprintsService,
	private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.newSprintForm.patchValue({
	  duration: 25,
	  startNow: true,
	  timeStartDate: this.today,
	  timeStartTime: this.in5min,
	  break: 5,
	  singleSprint: false
	});

	this.route.paramMap.subscribe(pm => {
	  this.username = pm.get('username');
	  this.projectsService.getProjectByUsernameAndSlug(this.username, pm.get('slug')).subscribe(project => this.project = new Project(project));
	});
  }

  get today(): string { return DateTime.local().toFormat('yyyy-MM-dd'); }
  get in5min(): string { return DateTime.local().plus({ minutes: 5 }).toFormat('HH:mm'); }

  onSubmit(): void {
	if (this.newSprintForm.valid) {
	  this.sprintsService.newSprint(this.username, this.project.slug, this.newSprintForm.value).subscribe(
	  res => {
		this.notificationsService.push('New sprint created!');
		this.router.navigate(['/u', this.username, this.project.slug, 'sprint', res]);
	  }, err => {
		console.log(err);
		this.notificationsService.push('Sorry, we were unable to create your sprint.')
	  });
	}
  }
}
