import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';

import { Project } from './project';
import { Sprint } from './sprint';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {
  private apiUrl: string = 'http://localhost:8080/';
  private token: string = undefined;

  constructor(
    private http: HttpClient,
	private sessionService: SessionService
  ) {
    this.sessionService.getCurrentSession().subscribe(session => this.token = session.token);
  }

  // return a project’s sprints
  getProjectSprints(username: string, projectSlug: string): Observable<Sprint[]> {
	return this.http.get<Sprint[]>(this.apiUrl + 'users/' + username + '/projects/' + projectSlug + '/sprints/').pipe(
	  map(sprints => {
	    for (let i in sprints) {
		  sprints[i] = new Sprint(sprints[i]);
		}
		return sprints;
	  })
	);
  }

  // return a specific sprint
  getSprintByUsernamePslugSslug(username: string, pslug: string, sslug: string): Observable<Sprint> {
	return this.http.get<Sprint>(this.apiUrl + 'users/' + username + '/projects/' + pslug + '/sprints/' + sslug).pipe(
	  map(sprint => new Sprint(sprint))
	);
  }

  // returns an observable of the sprint slug
  // data: { duration: number, startNow: boolean, timeStartDate: string, timeStartTime: string, break: number, singleSprint: boolean }
  newSprint(username: string, projectSlug: string, data: any): Observable<String> {
	// sprintData: { duration: number, timeStart: string, break: number }
	let sprintData: any = {};
	sprintData.duration = data.duration as number;
	sprintData.timeStart = data.startNow === true ? DateTime.local().toFormat("yyyy-MM-dd'T'HH:mm:ssZZZ") : data.timeStartDate + 'T' + data.timeStartTime + ':00' + DateTime.local().toFormat('ZZZ');
	sprintData.break = data.singleSprint === true ? 0 : +(data.break);

	// make request with token, observe response and get
    return this.http.post(this.apiUrl + 'users/' + username + '/projects/' + projectSlug + '/sprints/', sprintData, {
	  headers: { 'Authorization': 'Bearer ' + this.token },
	  observe: 'response',
	  responseType: 'json'
	}).pipe(
	  map(res => {
		let locationSegments = res.headers.get('Location').split('/');
		return locationSegments[locationSegments.length - 1];
	  })
	);
  }
}
