import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Project } from './project';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private usersUrl: string = 'http://localhost:8080/users/'
  private nullProject: Project = null;

  constructor(
    private http: HttpClient,
  ) { }

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
	return this.http.get<Project>(this.usersUrl + username + '/projects/' + slug);
  }
}
