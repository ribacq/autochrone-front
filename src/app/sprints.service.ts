import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project';
import { Sprint } from './sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {
  private sprintsUrl: string = 'http://localhost:8080/sprints/';

  constructor(
    private http: HttpClient
  ) { }

  getProjectSprints(username: string, projectSlug: string): Observable<Sprint[]> {
	return this.http.get<Sprint[]>(this.sprintsUrl, {
	  params: { username, projectSlug }
	}).pipe(
	  map(sprints => {
	    for (let i in sprints) {
		  sprints[i] = new Sprint(sprints[i]);
		}
		return sprints;
	  })
	);
  }
}
