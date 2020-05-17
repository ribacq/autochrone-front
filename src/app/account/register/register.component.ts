import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { SessionService } from '../../session.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private usersUrl: string = 'http://localhost:8080/users/';

  registerForm = new FormGroup({
	username: new FormControl('', [Validators.required, Validators.minLength(4)]),
	password: new FormControl('', [Validators.required, Validators.minLength(8)]),
	confirm: new FormControl('', [Validators.required, Validators.minLength(8)])
  }, {
	validators: [
	  rf => {
		let password = rf.get('password')
		let confirm = rf.get('confirm')
		return !!password && !!confirm && password.value === confirm.value ? null : { 'confirmMismatch': true };
	  }
	]
  });

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get confirm() { return this.registerForm.get('confirm'); }

  constructor(
	private http: HttpClient,
	private sessionService: SessionService,
	private notificationsService: NotificationsService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
	if (!this.registerForm.valid) {
	  this.notificationsService.push('Invalid data.');
	}

	this.http.post(this.usersUrl, {
	  username: this.username.value,
	  password: this.password.value,
	  confirm: this.confirm.value
	}).subscribe({
	  next: res => {
		this.notificationsService.push('Account created, welcome to autochrone!');
		this.sessionService.login(this.username.value, this.password.value).subscribe();
	  },
	  error: err => {
	    this.notificationsService.push('Error while creating your account.');
	  }
	});
  }
}
