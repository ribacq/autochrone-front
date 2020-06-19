import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { User } from '../../user';
import { SessionService } from '../../session.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  private usersUrl: string = 'http://192.168.1.42:8080/users/';

  passwordUpdateForm = new FormGroup({
	current: new FormControl('', [Validators.required, Validators.minLength(8)]),
	new: new FormControl('', [Validators.required, Validators.minLength(8)]),
	confirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, {
    validators: [
	  puf => {
	    let puNew = puf.get('new');
		let puConfirm = puf.get('confirm');
		return !!puNew && !!puConfirm && puNew.value === puConfirm.value ? null : { 'confirmMismatch': true };
	  }
	]
  });

  accountDeleteForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
	confirmCheck: new FormControl('', [Validators.required])
  });

  private token: string = null;
  user: User = null;

  constructor(
    private sessionService: SessionService,
    private notificationsService: NotificationsService,
	private http: HttpClient
  ) { }

  ngOnInit(): void {
	this.sessionService.getCurrentSession().subscribe(session => {
	  this.token = session.token;
	  this.user = session.user;
	});
  }

  onPasswordUpdateSubmit(): void {
	if (!this.user) {
	  this.notificationsService.push('You must login first.');
	  return;
	}
	if (!this.passwordUpdateForm.valid) {
	  this.notificationsService.push('Invalid data.');
	  return;
	}

	this.http.patch(this.usersUrl + this.user.username, {
	  operator: 'set',
	  path: 'password',
      value: this.passwordUpdateForm.get('new').value
	}, {
	  headers: {
		'Authorization': 'Bearer ' + this.token,
		'Secret': this.passwordUpdateForm.get('current').value
	  },
	}).subscribe({
	  next: _ => {
	    this.notificationsService.push('Your password has been updated.');
	  },
	  error: err => {
		if (err.status === 401) { // 401 Unauthorized
		  this.notificationsService.push('You made a mistake in your current password. Password unchanged.');
		  console.log(err.error);
		} else {
		  this.notificationsService.push('Sorry, an error occured on our side. Please try again.');
		}
	  }
	});
    
	this.passwordUpdateForm.reset();
  }

  onAccountDeleteSubmit(): void {
	if (!this.user) {
	  this.notificationsService.push('You must login first.');
	  return;
	}
	if (!this.accountDeleteForm.valid) {
	  this.notificationsService.push('Invalid data.');
	  return;
	}

	this.http.delete(this.usersUrl + this.user.username, {
	  headers: { 
	    'Authorization': 'Bearer ' + this.token,
		'Secret': this.accountDeleteForm.get('password').value
	  }
	}).subscribe({
	  next: _ => {
	    this.notificationsService.push('Your account was successfully deleted. Sorry to see you go.');
		this.sessionService.logout().subscribe();
	  },
	  error: err => {
	    if (err.status === 401) { // 401 Unauthorized
		  this.notificationsService.push('You made a mistake in your current password. Account was not deleted.');
		} else {
		  this.notificationsService.push('Sorry, an error occured on our side. Please try again.');
		}
	  }
	});

	this.accountDeleteForm.reset();
  }
}
