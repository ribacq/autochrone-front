import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../user';
import { Project } from '../../project';

@Component({
  selector: 'app-project-overview-cards',
  templateUrl: './project-overview-cards.component.html',
  styleUrls: ['./project-overview-cards.component.css']
})
export class ProjectOverviewCardsComponent implements OnInit {
  @Input('user') user: User;
  @Input('project') project: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
