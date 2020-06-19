import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Project } from '../../project';
import { User } from '../../user';
import { SessionService } from '../../session.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.css']
})
export class ProjectDeleteComponent implements OnInit {
  deleteForm = new FormGroup({
    url: new FormControl('', [Validators.required]),
	box: new FormControl('', [Validators.required])
  });

  currentUser: User;
  @Input() project: Project;
  @Input() user: User;
  private token: string = undefined;
  private usersUrl: string = 'http://192.168.1.42:8080/users/';

  constructor(
    private sessionService: SessionService,
	private notificationsService: NotificationsService,
	private http: HttpClient,
	private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionService.getCurrentSession().subscribe(session => {
	  this.currentUser = session.user;
	  this.token = session.token;
	});
  }

  onSubmit(): void {
	// form validity checks the required checkbox
	if (this.deleteForm.invalid) {
	  return;
	}

	// only attempt if logged in with the correct user
	if (!this.project.belongsTo(this.currentUser)) {
	  return;
	}

	// check the url
	if (this.deleteForm.get('url').value !== '/u/' + this.user.username + '/' + this.project.slug) {
	  return;
	}

	// send the delete order
	this.http.delete(this.usersUrl + this.user.username + '/projects/' + this.project.slug, {
	  headers: { 'Authorization': 'Bearer ' + this.token }
	}).subscribe({
	  next: _ => {
		this.notificationsService.push('Project was deleted. How sad u_u.');
	    this.router.navigate(['/u', this.user.username]);
	  },
	  error: err => {
	    if (err.status === 401) { // 401 Unauthorized
		  console.log(err);
		  this.notificationsService.push('Invalid log in. Project was not deleted.');
		} else {
		  this.notificationsService.push('Sorry, an error occured on our side. Please try again.');
		}
	  }
	});

	// reset form just in case
	this.deleteForm.reset();
  }
}
