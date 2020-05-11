import { Component, OnInit } from '@angular/core';

import { TitleService } from '../title.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  constructor(
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
	this.titleService.setTitle();
  }

}
