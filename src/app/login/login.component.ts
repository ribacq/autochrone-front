import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
	private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;
	if (username !== '' && password !== '') {
	  this.usersService.login(username, password).subscribe(
	    user => this.router.navigate([`u/${user.username}`])
	  );
	}
  }
}
