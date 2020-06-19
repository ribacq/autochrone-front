import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Sprint } from '../../sprint';
import { SprintsService } from '../../sprints.service';
import { NotificationsService } from '../../notifications.service';

@Component({
  selector: 'app-sprint-delete',
  templateUrl: './sprint-delete.component.html',
  styleUrls: ['./sprint-delete.component.css']
})
export class SprintDeleteComponent implements OnInit {
  sprint: Sprint;
  username: string;
  pslug: string;

  constructor(
	private router: Router,
	private route: ActivatedRoute,
	private sprintsService: SprintsService,
	private notificationsService: NotificationsService
  ) { }

  // on init get username, pslug and sprint
  ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
	  this.username = pm.get('username');
	  this.pslug = pm.get('pslug');
	  this.sprintsService.getSprintByUsernamePslugSslug(this.username, this.pslug, pm.get('sslug')).subscribe(sprint => this.sprint = sprint);
	});
  }

  deleteSprint(): void {
	this.sprintsService.deleteSprint(this.sprint).subscribe({
	  next: _ => this.notificationsService.push('Sprint was successfully deleted.'),
	  error: _ => this.notificationsService.push('Sorry, an error occured.')
	});
	this.goBack();
  }

  goBack(): void {
	this.router.navigate(['u', this.username, this.pslug]);
  }
}
