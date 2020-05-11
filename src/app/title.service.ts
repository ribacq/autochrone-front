import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  title = 'autochrone';

  constructor(
    private titleService: Title
  ) { }

  public setTitle(newTitle: string = '') {
	newTitle = newTitle.trim();
    this.titleService.setTitle(
	  newTitle !== '' ? `${newTitle} - ${this.title}` : this.title
	);
  }
}
