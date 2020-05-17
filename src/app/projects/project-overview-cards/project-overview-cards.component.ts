import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../user';
import { Project } from '../../project';
import { Sprint } from '../../sprint';
import { SprintsService } from '../../sprints.service';

@Component({
  selector: 'app-project-overview-cards',
  templateUrl: './project-overview-cards.component.html',
  styleUrls: ['./project-overview-cards.component.css']
})
export class ProjectOverviewCardsComponent implements OnInit {
  @Input('user') user: User;
  @Input('project') project: Project;

  constructor(
    private sprintsService: SprintsService
  ) { }

  ngOnInit(): void {
    this.sprintsService.getSprintsByUsernameAndProjectSlug(this.user.username, this.project.slug).subscribe(sprints => this.project.sprints = sprints);
  }

}
