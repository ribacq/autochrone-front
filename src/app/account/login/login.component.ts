import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from '../../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
	private router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
	if (this.loginForm.valid) {
	  this.sessionService.login(this.username.value, this.password.value).subscribe(session => {
	    if (session.token !== '') {
		  // TODO: use Location.back() or Router.navigate([somethingFromTheUrlQuery])
	      this.router.navigate(['/']);
		}
	  });
	}
  }
}
