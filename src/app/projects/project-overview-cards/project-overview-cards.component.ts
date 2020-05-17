import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../project';

@Component({
  selector: 'app-project-overview-cards',
  templateUrl: './project-overview-cards.component.html',
  styleUrls: ['./project-overview-cards.component.css']
})
export class ProjectOverviewCardsComponent implements OnInit {
  @Input('project') project: Project;

  constructor() { }

  ngOnInit(): void {
  }

}
