import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { formatDate } from '@angular/common';

import { Project } from './project';
import { User } from './user';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private usersUrl: string = 'http://localhost:8080/users/';
  private token: string = null;

  constructor(
    private http: HttpClient,
	private sessionService: SessionService
  ) {
    this.sessionService.getCurrentSession().subscribe(session => this.token = session.token);
  }

  getProjectsByUsername(username: string): Observable<Project[]> {
	return this.http.get<Project[]>(this.usersUrl + username + '/projects/').pipe(
	  map(projects => {
		for (let i in projects) {
		  projects[i] = new Project(projects[i]);
		}
		return projects;
	  })
	);
  }

  getProjectByUsernameAndSlug(username: string, slug: string): Observable<Project> {
	return this.http.get<Project>(this.usersUrl + username + '/projects/' + slug).pipe(
	  map(project => new Project(project))
	);
  }

  putProject(username: string, project: Project): Observable<boolean> {
	return this.http.put(this.usersUrl + username + '/projects/' + project.slug, {
	  name: project.name,
	  slug: project.slug,
	  wordCountStart: project.wordCountStart,
	  wordCountGoal: project.wordCountGoal,
	  dateStart: formatDate(project.dateStart, 'yyyy-MM-dd', 'en-US'),
	  dateEnd: formatDate(project.dateEnd, 'yyyy-MM-dd', 'en-US')
	}, {
	  headers: { 'Authorization': 'Bearer ' + this.token }
	}).pipe(mapTo(true));
  }
}
