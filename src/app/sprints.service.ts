import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { DateTime } from 'luxon';

import { Project } from './project';
import { Sprint } from './sprint';
import { SessionService } from './session.service';
import { API } from './api.const';

@Injectable({
  providedIn: 'root'
})
export class SprintsService {
  private apiUrl: string = API.url;
  private token: string = undefined;

  constructor(
    private http: HttpClient,
	private sessionService: SessionService
  ) {
    this.sessionService.getCurrentSession().subscribe(session => this.token = session.token);
  }

  // return a project’s sprints
  getProjectSprints(username: string, pslug: string): Observable<Sprint[]> {
	return this.http.get<Sprint[]>(this.apiUrl + 'users/' + username + '/projects/' + pslug + '/sprints/').pipe(
	  map(sprints => {
	    for (let i in sprints) {
		  sprints[i] = new Sprint(sprints[i]);
		}
		return sprints;
	  })
	);
  }

  // return a specific sprint by username, project slug and sprint slug
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

  // updates a sprint on the server
  updateSprint(sprint: Sprint): Observable<boolean> {
	return this.http.put(this.apiUrl + 'users/' + sprint.username + '/projects/' + sprint.pslug + '/sprints/' + sprint.slug, {
	  wordCount: sprint.wordCount,
	  isMilestone: sprint.isMilestone,
	  comment: sprint.comment
	}, {
	  headers: { 'Authorization': 'Bearer ' + this.token }
	}).pipe(mapTo(true));
  }

  // instantiates or gets and returns the sprint after the given one
  nextSprint(sprint: Sprint): Observable<Sprint> {
	return this.http.post(this.apiUrl + 'users/' + sprint.username + '/projects/' + sprint.pslug + '/sprints/' + sprint.slug + '/next-sprint', {
	  timeStart: DateTime.local().plus({ minutes: sprint.break }).toFormat("yyyy-MM-dd'T'HH:mm:ssZZZ")
	}, {
	  headers: { 'Authorization': 'Bearer ' + this.token }
	}).pipe(map(res => new Sprint(res)));
  }

  // deletes a sprint
  deleteSprint(sprint: Sprint): Observable<boolean> {
	return this.http.delete(this.apiUrl + 'users/' + sprint.username + '/projects/' + sprint.pslug + '/sprints/' + sprint.slug, {
	  headers: { 'Authorization': 'Bearer ' + this.token }
	}).pipe(mapTo(true));
  }

  // opens a sprint to guests
  openSprintToGuests(sprint: Sprint, comment: string): Observable<any> {
	// don’t make the request if the sprint is already open to guests
	if (sprint.isOpenToGuests) {
	  return of({ inviteSlug: sprint.inviteSlug });
	}

	// make the request
	return this.http.post(this.apiUrl + 'users/' + sprint.username + '/projects/' + sprint.pslug + '/sprints/' + sprint.slug + '/open', {
	  comment
	}, {
	  headers: { 'Authorization': 'Bearer ' + this.token }
	});
  }

  // getGuestSprints fetches the guests sprints in the database if this sprint is open to guests
  getGuestSprints(sprint: Sprint): Observable<Sprint[]> {
	// don’t make the request if the sprint is not open to guests
	if (!sprint.isOpenToGuests) {
	  return of([] as Sprint[]);
	}

	// make the request
	return this.http.get<Sprint[]>(this.apiUrl + 'users/' + sprint.username + '/projects/' + sprint.pslug + '/sprints/' + sprint.slug + '/guests').pipe(
	  map(sprints => {
	    for (let i in sprints) {
		  sprints[i] = new Sprint(sprints[i]);
		}
		return sprints;
	  })
	);
  }

  // newGuestSprint creates a new sprint for a given project, on a given project, after a model host sprint
  newGuestSprint(username: string, pslug: string, islug: string): Observable<Sprint> {
	return this.http.get<Sprint>(this.apiUrl + 'users/' + username + '/projects/' + pslug + '/join-invite/' + islug, {
	  headers: { 'Authorization': 'Bearer ' + this.token }
	}).pipe(map(sprint => new Sprint(sprint)));
  }
}
