import { User } from './user';
import { Sprint } from './sprint';

export interface DateSprints {
  date: Date;
  sprints: Sprint[];
}

export class Project {
  id: number;
  userId: number;
  name: string;
  slug: string;
  dateStart: Date;
  dateEnd: Date;
  wordCountStart: number;
  wordCountGoal: number;
  sprints: Sprint[];

  // copy data from interface to object
  constructor(data: Project) {
	this.id = data.id;
	this.userId = data.userId;
	this.name = data.name;
	this.slug = data.slug;
	this.dateStart = data.dateStart;
	this.dateEnd = data.dateEnd;
	this.wordCountStart = data.wordCountStart;
	this.wordCountGoal = data.wordCountGoal;
  }

  get sprintsByDate(): DateSprints[] {
	let ret: DateSprints[] = [];

    for (let i = 0; i < this.sprints.length; i++) {
	  let dayIndex = -1;
	  for (let j = 0; j < ret.length; j++) { // for some reason (let j in ret) would not work, j would be a string.
		if (Math.floor(ret[j].date.getTime()/(86400*1000)) === Math.floor(this.sprints[i].timeStart.getTime()/(86400*1000))) {
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

  isSprintAllowedForUser(user: User): boolean {
	return !!user && user.id === this.userId;
  }

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

  // TODO timeSpent, timeSpentDaily, ageInDays, daysLeft, endAtCurrentSpeed, isLate, WPM, WPH, WPD, wordsWrittenOn, wordsWrittenToday, wordsWrittenThisWeek, dailyGoal, weeklyGoal, wordsLeftToday, wordsLeftThisWeek
}
