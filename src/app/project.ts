import { formatDate } from '@angular/common';
import { DateTime, Duration, Interval } from 'luxon';

import { User } from './user';
import { Sprint } from './sprint';

export interface DateSprints {
  date: DateTime;
  sprints: Sprint[];
}

export class Project {
  id: number;
  userId: number;
  name: string;
  slug: string;
  dateStart: DateTime;
  dateEnd: DateTime;
  wordCountStart: number;
  wordCountGoal: number;
  sprints: Sprint[];

  // copy data from interface to object
  constructor(data: any = null) {
	if (data !== null) {
	  this.id = data.id as number;
	  this.userId = data.userId as number;
	  this.name = data.name as string;
	  this.slug = data.slug as string;
	  this.dateStart = DateTime.fromISO(data.dateStart as string).startOf('day');
	  this.dateEnd = DateTime.fromISO(data.dateEnd as string).startOf('day');
	  this.wordCountStart = data.wordCountStart as number;
	  this.wordCountGoal = data.wordCountGoal as number;
	} else {
	  this.dateStart = DateTime.local();
	  this.dateEnd = DateTime.local();
	}
  }

  // permissions
  belongsTo(user: User): boolean {
    return !!user && user.id === this.userId;
  }

  isSprintAllowedForUser(user: User): boolean {
	return this.belongsTo(user);
  }

  // accessors
  get formValue(): object {
	return {
	  name: this.name,
	  slug: this.slug,
	  dateStart: this.dateStart.toFormat('yyyy-MM-dd'),
	  dateEnd: this.dateEnd.toFormat('yyyy-MM-dd'),
	  wordCountStart: this.wordCountStart,
	  wordCountGoal: this.wordCountGoal
	};
  }

  get sprintsByDate(): DateSprints[] {
	let ret: DateSprints[] = [];

    for (let i = 0; i < this.sprints.length; i++) {
	  let dayIndex = -1;
	  for (let j = 0; j < ret.length; j++) { // for some reason (let j in ret) would not work, j would be a string.
	    if (+(ret[j].date.startOf('day')) === +(this.sprints[i].timeStart.startOf('day'))) {
		  dayIndex = j;
		  break;
		}
	  }
	  if (dayIndex === -1) {
	    ret.push({
		  date: this.sprints[i].timeStart,
		  sprints: [this.sprints[i]]
		});
	  } else {
		ret[dayIndex].sprints.push(this.sprints[i]);
	  }
	}

	return ret;
  }

  // stats
  get currentWordCount(): number {
	let sum = this.wordCountStart;
	for (let i in this.sprints) {
	  sum += this.sprints[i].wordCount;
	}
	return sum;
  }

  get wordsLeft(): number { return this.wordCountGoal - this.currentWordCount; }

  get completionPct(): string {
	return (100 * this.currentWordCount / this.wordCountGoal).toFixed(1);
  }

  get timeSpent(): Duration {
	let ts = Duration.fromMillis(0);
	for (let i in this.sprints) {
	  ts = ts.plus({minutes: this.sprints[i].duration});
	}
	ts = ts.shiftTo('hours', 'minutes');
	return ts;
  }

  get prettyTimeSpent(): string {
	return this.timeSpent.toFormat("h'h'mm'm'");
  }

  get ageInDays(): number {
	return Math.floor(DateTime.local().startOf('day').plus({days: 1}).diff(this.dateStart).as('days'));
  }

  get daysLeft(): number {
	return Math.floor(this.dateEnd.diff(DateTime.local().startOf('day').minus({days: 1})).as('days'));
  }

  get endAtCurrentSpeed(): DateTime {
    let wpd = this.wpd;
	if (wpd != 0) {
	  return DateTime.local().startOf('day').plus({days: this.wordsLeft / wpd});
	}
	return this.dateEnd;
  }

  get endAtCurrentSpeedJS(): Date {
	return this.endAtCurrentSpeed.toJSDate();
  }

  get wpm(): number {
    let ts = this.timeSpent;
	if (ts.as('minutes') > 0) {
	  return Math.floor((this.currentWordCount - this.wordCountStart) / ts.as('minutes'));
	}
	return 0;
  }

  get wph(): number { return 60 * this.wpm; }
  
  get wpd(): number { return (this.currentWordCount - this.wordCountStart) / this.ageInDays; }

  get isLate(): boolean { return this.endAtCurrentSpeed > this.dateEnd }

  wordsWrittenOn(day: DateTime): number {
	day = day.startOf('day');
	let ws = 0;
	for (let i in this.sprints) {
	  if (+(this.sprints[i].timeStart.startOf('day')) === +day) {
	    ws += this.sprints[i].wordCount;
	  }
	}
	return ws;
  }

  get wordsWrittenToday(): number {
    return this.wordsWrittenOn(DateTime.local());
  }

  get dailyGoal(): number {
    let dl = this.daysLeft;
	if (dl > 0) {
	  return Math.floor((this.wordsLeft + this.wordsWrittenToday) / dl);
	}
	return this.wordsLeft + this.wordsWrittenToday;
  }

  get wordsLeftToday(): number {
	let dl = this.daysLeft;
	if (dl > 0) {
	  return this.dailyGoal - this.wordsWrittenToday;
	}
	return this.wordsLeft;
  }

  get wordsWrittenThisWeek(): number {
    let today = DateTime.local().startOf('day');
    let weekStart = today.startOf('week');
	let ws = 0;
	for (let day = weekStart; +day <= +today; day = day.plus({days: 1})) {
	  ws += this.wordsWrittenOn(day);
	}
	return ws;
  }

  get weeklyGoal(): number {
    let today = DateTime.local().startOf('day');
	let weekStart = today.startOf('week');
	let dl = this.daysLeft + today.diff(weekStart).as('days');
	if (dl >= 7) {
	  return Math.floor(7 * (this.wordsLeft + this.wordsWrittenThisWeek) / dl);
	}
	return this.wordsLeft + this.wordsWrittenThisWeek;
  }

  get wordsLeftThisWeek(): number {
    if (this.daysLeft >= 7) {
	  return this.weeklyGoal - this.wordsWrittenThisWeek;
	}
	return this.wordsLeft;
  }
}
