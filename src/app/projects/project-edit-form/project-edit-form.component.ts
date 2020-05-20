import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

import { Project } from '../../project';
import { User } from '../../user';
import { SessionService } from '../../session.service';

@Component({
  selector: 'app-project-edit-form',
  templateUrl: './project-edit-form.component.html',
  styleUrls: ['./project-edit-form.component.css']
})
export class ProjectEditFormComponent implements OnInit {
  @Input() project: Project;
  @Output() newProjectEvent = new EventEmitter<Project>();
  @Input() user: User;
  currentUser: User;

  projectForm = new FormGroup({
	name: new FormControl('', [Validators.required]),
	dateStart: new FormControl('', [Validators.required]),
	dateEnd: new FormControl('', [Validators.required]),
	wordCountStart: new FormControl('', [Validators.required]),
	wordCountGoal: new FormControl('', [Validators.required])
  });

  constructor(
	private sessionService: SessionService
  ) { }

  ngOnInit(): void {
	this.sessionService.getCurrentSession().subscribe(session => this.currentUser = session.user);
	this.projectForm.patchValue(this.project.formValue);
  }

  onSubmit(): void {
	if (this.projectForm.valid && this.project.belongsTo(this.currentUser)) {
	  let data: Project = new Project(this.projectForm.value as Project);
	  data.slug = this.project.slug;
	  this.newProjectEvent.emit(data);
	}
  }
}
