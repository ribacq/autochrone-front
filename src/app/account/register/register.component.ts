import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from '../../session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
    private router: Router,
	private sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
	console.log(42);
  }
}
