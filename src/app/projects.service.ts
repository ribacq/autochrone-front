import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { formatDate } from '@angular/common';

import { Project } from './project';
import { User } from './user';
import { SprintsService } from './sprints.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private usersUrl: string = 'http://localhost:8080/users/';
  private token: string = null;

  constructor(
    private http: HttpClient,
	private sprintsService: SprintsService,
	private sessionService: SessionService
  ) {
    this.sessionService.getCurrentSession().subscribe(session => this.token = session.token);
  }

  getProjectsByUsername(username: string): Observable<Project[]> {
	return this.http.get<Project[]>(this.usersUrl + username + '/projects/').pipe(
	  map(projects => {
		for (let i in projects) {
		  projects[i] = new Project(projects[i]);
	      this.sprintsService.getProjectSprints(username, projects[i].slug).subscribe(sprints => projects[i].sprints = sprints);
		}
		return projects;
	  })
	);
  }

  getProjectByUsernameAndSlug(username: string, slug: string): Observable<Project> {
	return this.http.get<Project>(this.usersUrl + username + '/projects/' + slug).pipe(
	  map(project => {
	    let p = new Project(project);
        this.sprintsService.getProjectSprints(username, p.slug).subscribe(sprints => p.sprints = sprints);
		return p;
	  })
	);
  }

  putProject(username: string, project: Project): Observable<boolean> {
	return this.http.put(this.usersUrl + username + '/projects/' + project.slug, project.formValue, {
	  headers: { 'Authorization': 'Bearer ' + this.token }
	}).pipe(mapTo(true));
  }

  /*postProject(username: string, project: Project): Observable<Project> {
    return of(null);
  }*/
}
